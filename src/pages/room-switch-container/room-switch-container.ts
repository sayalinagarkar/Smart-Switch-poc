import { Component, ViewChild } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  Slides,
  ToastController,
  AlertController,
} from "ionic-angular";
import{
  timeout,
} from "rxjs/operators";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { RoomDetailsProvider } from "../../providers/room-details/room-details";
import { WebsocketProvider } from "../../providers/websocket/websocket";
import { AddDeviceDatailsPage } from "../add-device-datails/add-device-datails";
import { AddRoomPage } from "../add-room/add-room";
import { RootedIpInputModelPage } from "../rooted-ip-input-model/rooted-ip-input-model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  LoadingController } from 'ionic-angular';
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
  //rootedIPRange=['192.168.29.125','192.168.29.126','192.168.29.127','192.168.29.128','192.168.29.129','192.168.29.130'];
  //rootedIPRange=['192.168.0.25','192.168.0.26','192.168.0.27','192.168.0.28','192.168.0.29','192.168.0.30',
    //           '192.168.0.31','192.168.0.32']
 // rootedIPRange=['']
  rootedIPRange=['10.211.134.1','10.202.229.1'];
  rootedIP;
  Result;
  rooms: any = [];
  pages = "0";
  switchBoardList = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public roomDetailsProvider: RoomDetailsProvider,
    private websocketProvider: WebsocketProvider,
    public toastController: ToastController,
    public alertCtrl: AlertController,
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    public httpClient: HttpClient
  ) {
      this.initDeviceListConfiguration();
      //this.getRootedIPData();
      this.websocketProvider.getMqttData().subscribe((data: any) => {
        console.log("Mqtt data passed to function", data);
        this.roomDetailsProvider.setNewDeviceData(data);
        this.initDeviceListConfiguration();
      });
  }

  async getRootedIPData(){
    let loading = this.loadingCtrl.create({
      content: 'Extracting rootedIP'
    });
    let foundRootedIPFlag=false;
    for(let rootedIPIndex = 0; rootedIPIndex < this.rootedIPRange.length;rootedIPIndex++)
    {
      foundRootedIPFlag=false;
          loading.present();
       const result = await this.checkCorrectUrl(this.rootedIPRange[rootedIPIndex]);
       console.log("trying rootedIP",this.rootedIPRange[rootedIPIndex]);
       if(result){
        this.rootedIP = this.rootedIPRange[rootedIPIndex] + ":81/";
        //this.rootedIP='localhost:8082';
        console.log("Rooted IP is");
        console.log(this.rootedIP);
        foundRootedIPFlag=true;
         loading.dismiss();
        break;
       }
    }
    if(!foundRootedIPFlag){
       loading.dismiss();
      const alert = this.alertCtrl.create({
              title: 'No correct rooted IP found',
              subTitle: 'Please try again',
              buttons: [

                {
                  text: 'close',
                  handler: () => {

                  }
                },
                {
                  text: 'Try again',
                  handler: () => {
                    this.getRootedIPData();
                  }
                }
              ]
            });
            alert.present();
    }
    if (this.rootedIP)
    {
      this.inItSocketConnection();
      this.websocketProvider.getData().subscribe((data: any) => {
        console.log("data passed to function", data);
        this.roomDetailsProvider.setNewDeviceData(data);
        this.initDeviceListConfiguration();
      });
    }
  }

  // async getData(){
  //   for(let rootedIPIndex = 0; rootedIPIndex < this.rootedIPRange.length;rootedIPIndex++)
  //   {
  //      const result = await this.checkCorrectUrl(this.rootedIPRange[rootedIPIndex])
  //      if(result){
  //       this.rootedIP = result + ":81/";
  //       console.log("Rooted IP is");
  //       console.log(this.rootedIP);
  //       break;
  //      }
  //   }
  //   if (this.rootedIP)
  //   {
  //     this.inItSocketConnection();
  //   }
  // }

  // Initialize slider
  ionViewDidEnter(){
    this.slideChanged();
  }

  addRootedIP(){
    this.navCtrl.push(RootedIpInputModelPage);

  }
  getData(){

  }
  inItSocketConnection() {
    try {
      this.websocketProvider.connectToSocket(this.rootedIP);
      
      

    } catch (error) {
      this.rootedIP = "";
      console.log(error);
      const alert = this.alertCtrl.create({
        title: "Sorry,cannot connect to server",
        subTitle: "please try again",
        buttons: [
          {
            text: "connect again",
            handler: () => {
              this.inItSocketConnection();
            },
          },
          {
            text: "close",
            handler: () => {},
          },
        ],
      });
      alert.present();
    }
  }

  initDeviceListConfiguration(): void {
    this.roomDetailsProvider.createAndAssignDeviceIndexArray();
    this.rooms = this.roomDetailsProvider.getAllRoomDetails();
    //this.roomName=this.rooms[Number(this.pages)];
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

  async checkCorrectUrl(ip): Promise<any> {
    try {
      const headers = new HttpHeaders().set('Content-Type','text/plain; charset=utf-8')
      const response = await this.httpClient.get(`http://${ip}/getIP`,{headers,responseType:'text'}).pipe(
        timeout(2000)
      ).toPromise();
      return response
    } catch (err) {
      return false;
    }
  }
}
