import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";

@Component({
  selector: "page-home",
  templateUrl: "home.html",
})
export class HomePage {
  deviceListConfiguration: any;

  constructor(
    public navCtrl: NavController,
    private deviceListFormatterProvider: DeviceListFormatterProvider
  ) {
    this.initDeviceListConfiguration();
  }

  initDeviceListConfiguration(): void {
    this.deviceListConfiguration = this.deviceListFormatterProvider.getDeviceListConfiguration();
  }
}
