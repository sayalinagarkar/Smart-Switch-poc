import { Component, ViewChild } from "@angular/core";
import { AlertController, NavController, Slides } from "ionic-angular";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";
import { WebsocketProvider } from "../../providers/websocket/websocket";
import { RootedIpInputModelPage } from "../rooted-ip-input-model/rooted-ip-input-model";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{
  timeout,
} from "rxjs/operators";
@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  deviceListConfiguration: any;
  pages = "0";
  dataServer;
  //rootedIPRange=['192.168.29.125','192.168.29.126','192.168.29.127','192.168.29.128','192.168.29.129','192.168.29.130'];
  rootedIPRange=['10.247.171.1','10.120.185.1','10.199.20.1','10.126.150.1'];
  rootedIP;
  Result;
  @ViewChild("slider") slider: Slides;
  totalDeviceStatus=[];
  deviceList;

  constructor(
    public navCtrl: NavController,
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private deviceStatusCheckProvider: DeviceStatusCheckProvider,
    public alertCtrl: AlertController,
    private websocketProvider:WebsocketProvider,
    public httpClient: HttpClient
  ) {

    this.getData();
    this.initDeviceListConfiguration();
}

async getData(){
  for(let rootedIPIndex = 0; rootedIPIndex < this.rootedIPRange.length;rootedIPIndex++)
  {
     const result = await this.checkCorrectUrl(this.rootedIPRange[rootedIPIndex])
     if(result){
      this.rootedIP = result + ":81/";
      console.log("Rooted IP is");
      console.log(this.rootedIP);
      break;
     }
  }
  if (this.rootedIP)
  {
    this.inItSocketConnection();
  }
}

inItSocketConnection(){
 try{
  this.websocketProvider.connectToSocket(this.rootedIP);

      this.websocketProvider.getData().subscribe((data:any) => {
        console.log("data passed to function",data);
 // this.deviceListFormatterProvider.setNewDeviceData(data);
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
    this.deviceList=this.deviceListFormatterProvider.getDeviceTypeList();
    this.deviceListConfiguration = this.deviceListFormatterProvider.getDeviceListConfiguration();
   // console.log(this.deviceListConfiguration[0])
    for(let i=0;i<this.deviceListConfiguration.length;i++){
      for(let k=0;k<this.deviceListConfiguration[i].length;k++)
      {
      this.totalDeviceStatus[m++]=this.deviceListConfiguration[i][k].toggleValue;

    }
  }
//console.log(this.totalDeviceStatus);
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
