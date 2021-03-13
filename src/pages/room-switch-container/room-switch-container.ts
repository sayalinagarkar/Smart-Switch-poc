import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  ToastController,
  AlertController,
} from "ionic-angular";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { RoomDetailsProvider } from "../../providers/room-details/room-details";
import { WebsocketProvider } from "../../providers/websocket/websocket";
import { AddDeviceDatailsPage } from "../add-device-datails/add-device-datails";
import { AddRoomPage } from "../add-room/add-room";
import { RootedIpInputModelPage } from "../rooted-ip-input-model/rooted-ip-input-model";

/**
 * Generated class for the RoomSwitchContainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-room-switch-container",
  templateUrl: "room-switch-container.html",
})
export class RoomSwitchContainerPage {
  @ViewChild("slider") slider: Slides;
  @ViewChild("segments") segments;
  deviceListConfiguration;
  totalDeviceStatus = [];
  pages1: Array<{ title: string; component: any }>;
  roomName='';
  rootedIP;
  rooms: any = [];
  pages = "0";
  switchBoardList = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public roomDetailsProvider: RoomDetailsProvider,
    private websocketProvider: WebsocketProvider,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private deviceListFormatterProvider: DeviceListFormatterProvider
  ) {
    this.inItSocketConnection();
    
    this.initDeviceListConfiguration();

  }
  // Initialize slider
  ionViewDidEnter(){
    this.slideChanged();
  }

  addRootedIP(){
    this.navCtrl.push(RootedIpInputModelPage);

  }
  inItSocketConnection() {
    try {
      this.websocketProvider.connectToSocket(this.rootedIP);
      console.log("called connect room ")
      this.websocketProvider.getData().subscribe((data: any) => {
        console.log("data passed to function", data);
        this.roomDetailsProvider.setNewDeviceData(data);
        this.initDeviceListConfiguration();
      });
    } catch (error) {
      this.rootedIP = "";
      console.log(error);
      // const alert = this.alertCtrl.create({
      //   title: "Sorry,cannot connect to server",
      //   subTitle: "please try again",
      //   buttons: [
      //     {
      //       text: "connect again",
      //       handler: () => {
      //         this.inItSocketConnection();
      //       },
      //     },
      //     {
      //       text: "close",
      //       handler: () => {},
      //     },
      //   ],
      // });
      // alert.present();
    }
  }

  initDeviceListConfiguration(): void {
    this.roomDetailsProvider.createAndAssignDeviceIndexArray();
    this.rooms = this.roomDetailsProvider.getAllRoomDetails();
    this.roomName=this.rooms[Number(this.pages)];
    this.switchBoardList = this.roomDetailsProvider.getSwitchBoardList(
      Number(this.pages)
    );
    this.totalDeviceStatus = this.roomDetailsProvider.getDeviceArray();
    this.deviceListConfiguration = this.roomDetailsProvider.getAllDetails();

  }

  categoryChanged($event) {}
  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }
  addDevice() {
    this.navCtrl.push(AddDeviceDatailsPage, {
      addSwitchBoardPage: true,
      addDevicePage: false,
      currentRoom: Number(this.pages),
    });
  }
  addSwitchBoard() {
    this.navCtrl.push(AddDeviceDatailsPage, {
      addSwitchBoardPage: false,
      addDevicePage: true,
      currentRoom: Number(this.pages),
    });
  }
  ionViewDidLoad() {
  }
  selectedTab(index) {
    this.slider.slideTo(index);
    this.roomName=this.rooms[Number(index)];
  }
  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    let slides_count = this.segments.nativeElement.childElementCount;

    this.pages = currentIndex.toString();
    if(this.pages >= slides_count)
      this.pages = (slides_count-1).toString();

    this.roomName=this.rooms[Number(this.pages)];
    this.switchBoardList = this.roomDetailsProvider.getSwitchBoardList(
      Number(this.pages)
    );

    this.sendRoomChangedData();
    this.centerScroll();
  }

  // Center current scroll
  centerScroll(){
    if(!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    let sizeCurrent = this.segments.nativeElement.children[this.pages].clientWidth;
    let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent/2) ;

    result = (result > 0) ? result : 0;
    this.smoothScrollTo(result);
  }

  // Get size start to current
  sizeLeft(){
    let size = 0;
    for(let i = 0; i < Number(this.pages); i++){
      size+= this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX){
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 200;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }

  moveSlider($event) {
    this.pages = this.slider.getActiveIndex().toString();
    this.roomName=this.rooms[Number(this.pages)];
    this.switchBoardList = this.roomDetailsProvider.getSwitchBoardList(
      Number(this.pages)
    );
    this.sendRoomChangedData();
    document.getElementById("segment-" + this.pages).scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
  sendRoomChangedData() {
    for(let i=0;i<this.switchBoardList.length;i++)
    this.websocketProvider.sendData({
      MsgNmbr: "103",
      NodeName: this.switchBoardList[i].node.toString(),
    });
  }
  deleteRoom() {
    //add logic that only if room is empty can delete
    let currentIndex = this.slider._activeIndex;
    console.log(currentIndex);
    this.rooms = this.roomDetailsProvider.deleteRoom(currentIndex);
    this.pages = "0";
    this.switchBoardList = this.roomDetailsProvider.getSwitchBoardList(
      Number(this.pages)
    );

    console.log(this.rooms);
    const toast = this.toastController.create({
      message: "room deleted",
      duration: 2000,
    });
    toast.present();
  }

  deleteDevice() {}
}