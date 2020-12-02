import { Component, Input, OnInit } from "@angular/core";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";
import { Subscription } from "rxjs/Subscription";

/**
 * Generated class for the SwitchBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "switch-box",
  templateUrl: "switch-box.html",
})
export class SwitchBoxComponent implements OnInit {
  @Input() deviceListConfiguration: any;
  @Input() roomIndex: number;
  @Input() totalDeviceStatus;
  @Input() rootedIP: string;
  interval: any;
  deviceListConfigurationData: any;
  _subscription: Subscription;
  constructor(
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private deviceStatusCheckProvider: DeviceStatusCheckProvider
  ) {
    this.deviceListConfigurationData = this.deviceListFormatterProvider.getDeviceListConfiguration();

  }

  ngOnInit() {
    this._subscription = this.deviceListFormatterProvider.rootedIPChange.subscribe(
      (value) => {
        this.rootedIP = value;
        console.log(this.rootedIP);
      }
    );

    this.interval = setInterval(() => {
     this.checkStatus();
    }, 3000);

  }

  checkStatus() {
    const url = `http://${this.rootedIP}/getStatus`;
   // const url1="https://api.mocki.io/v1/5aca1f25";
    console.log(url, "getStatusAPI");
    this.deviceStatusCheckProvider
      .checkDeviceStatus(url)
      .then((data) => {
        console.log(data, "getStatus data received");
        this.updatedeviceStatus(data);
      })
      .catch((error) => {
        console.log("getStatus data not received");
      });
  }
  updatedeviceStatus(deviceData) {
    console.log("getstatus called");
    if (deviceData !== "") {
      for (let i = 0; i < this.deviceListConfigurationData.length; i++) {
        for (let k = 0; k < this.deviceListConfigurationData[i].length; k++) {
          this.totalDeviceStatus[this.deviceListConfigurationData[i][k].index] =
            deviceData[this.deviceListConfigurationData[i][k].deviceID];
        }
      }
    }
  }

  deviceSwitchClicked(device: any, index, deviceIndex) {
    let deviceStatus = "OFF";
    this.totalDeviceStatus[index] = !this.totalDeviceStatus[index];
    if (this.totalDeviceStatus[index]) deviceStatus = "ON";
    const url = `http://${this.rootedIP}/${device.deviceID}?message=${deviceStatus}`;
    const url1="http://scratchpads.eu/explore/sites-list";
    console.log(url, "deviceAPI");
    this.deviceStatusCheckProvider
      .checkDeviceStatus(url1)
      .then((data) => {
        console.log(data, "device statusdata received");
        this.deviceStatusResponse(
          index,
          this.totalDeviceStatus[index],
          deviceIndex
        );
      })
      .catch((error) =>{
        console.log("no data recerived");
        this.deviceStatusResponse(
          index,
          !this.totalDeviceStatus[index],
          deviceIndex
        )
      }
      );
  }
  updateToggleItem(deviceName: String) {}

  deviceStatusResponse(index, deviceStatus, deviceIndex) {
    this.totalDeviceStatus[index] = deviceStatus;
    this.deviceListFormatterProvider.setDeviceListConfiguration(
      this.roomIndex,
      deviceIndex,
      deviceStatus
    );
    console.log(this.totalDeviceStatus, "totaldeviceStatus");
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this._subscription.unsubscribe();

  }
}
