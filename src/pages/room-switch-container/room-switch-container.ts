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
    this.deviceListFormatterProvider
      .getRootedIPValueFromStorage()
      .then((value) => {
        this.rootedIP = value.toString();
        if (this.rootedIP) {
          this.inItSocketConnection();
        }
      })
      .catch((error) => {
        this.rootedIP = "";
        console.log(error);
        const alert = this.alertCtrl.create({
          title: "Rooted IP not found!",
          subTitle: "Please register your rooted Ip again",
          buttons: [
            {
              text: "Add Rooted IP",
              handler: () => {
                this.navCtrl.push(RootedIpInputModelPage);
              },
            },
          ],
        });
        alert.present();
      });

    this.initDeviceListConfiguration();

  }
  addRootedIP(){
    this.navCtrl.push(RootedIpInputModelPage);

  }
  inItSocketConnection() {
    try {
      this.websocketProvider.connectToSocket(this.rootedIP);

      this.websocketProvider.getData().subscribe((data: any) => {
        console.log("data passed to function", data);
        this.roomDetailsProvider.setNewDeviceData(data);
        this.initDeviceListConfiguration();
      });
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
