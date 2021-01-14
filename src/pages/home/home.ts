import { Component, ViewChild } from "@angular/core";
import { AlertController, NavController, Slides } from "ionic-angular";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";
import { WebsocketProvider } from "../../providers/websocket/websocket";
import { RootedIpInputModelPage } from "../rooted-ip-input-model/rooted-ip-input-model";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  deviceListConfiguration: any;
  pages = "0";
  dataServer;
  rootedIP:string;
  @ViewChild("slider") slider: Slides;
  totalDeviceStatus=[];

  constructor(
    public navCtrl: NavController,
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private deviceStatusCheckProvider: DeviceStatusCheckProvider,
    public alertCtrl: AlertController,
    private websocketProvider:WebsocketProvider
  ) {
    this.deviceListFormatterProvider.getRootedIPValueFromStorage().then((value)=>
     { this.rootedIP = value.toString();
   if(this.rootedIP){

    this.inItSocketConnection();

  }
    }
    ).catch((error)=>{
      this.rootedIP='';
      console.log(error);
      const alert = this.alertCtrl.create({
        title: 'Rooted IP not found!',
        subTitle: 'Please register your rooted Ip again',
        buttons: [
          {
            text: 'Add Rooted IP',
            handler: () => {
              console.log('Buy clicked');
              this.navCtrl.push(RootedIpInputModelPage);
            }
          }
        ]
      });
      alert.present();
}
)

    this.initDeviceListConfiguration();
}
inItSocketConnection(){
 try{
  this.websocketProvider.connectToSocket(this.rootedIP);

      this.websocketProvider.getData().subscribe((data:any) => {
        console.log("data passed to function",data);
  this.deviceListFormatterProvider.setNewDeviceData(data);
  this.initDeviceListConfiguration();

      });
    }
    catch(error) {
      this.rootedIP='';
      console.log(error);
      const alert = this.alertCtrl.create({
        title: 'Sorry,cannot connect to server',
        subTitle: 'please try again',
        buttons: [
          {
            text: 'connect again',
            handler: () => {
              console.log('Buy clicked');
              this.inItSocketConnection();
            }
          },
          {
            text: 'close',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
}
}

  initDeviceListConfiguration(): void {
    let m=0;
    this.deviceListConfiguration = this.deviceListFormatterProvider.getDeviceListConfiguration();
    console.log(this.deviceListConfiguration[0])
    for(let i=0;i<this.deviceListConfiguration.length;i++){
      for(let k=0;k<this.deviceListConfiguration[i].length;k++)
      {
      this.totalDeviceStatus[m++]=this.deviceListConfiguration[i][k].toggleValue;

    }
  }
console.log(this.totalDeviceStatus);
}
  selectedTab(index) {
    this.slider.slideTo(index);
  }
  moveSlider(event) {
    this.pages = this.slider.getActiveIndex().toString();
    this.sendRoomChangedData();
  }
  onAddDevice(){
  }

  sendRoomChangedData(){
    this.websocketProvider.sendData({
      "MsgNmbr": "103",
      "NodeName":  (Number(this.pages)+1).toString(),
    });
  }
}
