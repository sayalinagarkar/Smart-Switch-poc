import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";
import { Observable, Subject } from "rxjs";
import { switchMap, takeUntil, catchError } from "rxjs/operators";
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
  constructor(
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private deviceStatusCheckProvider: DeviceStatusCheckProvider
  ) {
    this.deviceListConfigurationData = this.deviceListFormatterProvider.getDeviceListConfiguration();
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.checkStatus();
    }, 1000);
  }

  checkStatus() {
    const url = `${this.rootedIP}/getStatus`;
    const url1 = "https://jsonplaceholder.typicode.com/posts";

    this.deviceStatusCheckProvider
      .checkDeviceStatus(url)
      .then((data) => {
        this.updatedeviceStatus(data);
      })
      .catch((error) => {});
  }
  updatedeviceStatus(deviceData) {
    console.log("called");
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
    // this.deviceSelected[index] = !this.deviceSelected[index];
    this.totalDeviceStatus[index] = !this.totalDeviceStatus[index];
    if (this.totalDeviceStatus[index]) deviceStatus = "ON";
    const url = `${this.rootedIP}/${device.deviceID}?message=${deviceStatus}`;
    const url1 = "https://jsonplaceholder.typicode.com/posts";
    console.log(url);
    this.deviceStatusCheckProvider
      .checkDeviceStatus(url)
      .then((data) => {
        this.deviceStatusResponse(
          index,
          this.totalDeviceStatus[index],
          deviceIndex
        );
      })
      .catch((error) =>
        this.deviceStatusResponse(
          index,
          !this.totalDeviceStatus[index],
          deviceIndex
        )
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
    console.log(this.totalDeviceStatus);
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
