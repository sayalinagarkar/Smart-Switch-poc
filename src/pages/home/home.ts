import { Component, ViewChild } from "@angular/core";
import { AlertController, NavController, Slides } from "ionic-angular";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  deviceListConfiguration: any;
  pages = "0";
  rootedIP:string;
  @ViewChild("slider") slider: Slides;
  totalDeviceStatus=[];

  constructor(
    public navCtrl: NavController,
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private deviceStatusCheckProvider: DeviceStatusCheckProvider,
    public alertCtrl: AlertController
  ) {
    this.initDeviceListConfiguration();

  }

  initDeviceListConfiguration(): void {
    this.deviceListConfiguration = this.deviceListFormatterProvider.getDeviceListConfiguration();
    for(let i=0;i<this.deviceListConfiguration.length;i++){
      for(let k=0;k<this.deviceListConfiguration[i].length;k++)
      this.totalDeviceStatus.push(false);
    }
    this.deviceListFormatterProvider.getValueFromStorage().then((value)=>
     { this.rootedIP = value.toString();}
    ).catch((error)=>{
      this.rootedIP='';
      const alert = this.alertCtrl.create({
        title: 'Rooted IP not found!',
        subTitle: 'Please register your rooted Ip again',
        buttons: ['OK']
      });
      alert.present();
}

    )

  }
  selectedTab(index) {
    this.slider.slideTo(index);
  }
  moveSlider(event) {
    this.pages = this.slider.getActiveIndex().toString();
  }
  onAddDevice(){
  }

}
