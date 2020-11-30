import { Component, ViewChild } from "@angular/core";
import { NavController, Slides } from "ionic-angular";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  deviceListConfiguration: any;
  pages = "0";
  @ViewChild("slider") slider: Slides;

  constructor(
    public navCtrl: NavController,
    private deviceListFormatterProvider: DeviceListFormatterProvider
  ) {
    this.initDeviceListConfiguration();
  }

  initDeviceListConfiguration(): void {
    this.deviceListConfiguration = this.deviceListFormatterProvider.getDeviceListConfiguration();
  }
  selectedTab(index) {
    this.slider.slideTo(index);
  }
  moveSlider(event) {
    this.pages = this.slider.getActiveIndex().toString();
  }
  onAddDevice(){
    console.log("device")
    }
}
