import { Component, Input, OnInit } from "@angular/core";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";
import { Subscription } from "rxjs/Subscription";
import { WebsocketProvider } from "../../providers/websocket/websocket";

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
  @Input() deviceListConfigurationData: any;
  @Input() roomIndex: number;
  @Input() totalDeviceStatus;
  @Input() rootedIP: String;
  ws: any;
  interval: any;
  currentSpeed=0;

  //deviceListConfigurationData: any;
  _subscription: Subscription;
  constructor(
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private websocketProvider: WebsocketProvider
  ) {
    // this.deviceListConfigurationData = this.deviceListFormatterProvider.getDeviceListConfiguration();
    //   this.deviceListFormatterProvider.getValueFromStorage().then((value)=>
    //   {
    //     console.log("in comp");
    //     this.rootedIP = value.toString();}
    //  ).catch((error)=>{
    //    this.rootedIP='';
    //  })
  }
  ngOnChanges() {
    //console.log('msg', this.rootedIP);
    //    if(this.rootedIP)
    //  this.websocketProvider.connectToSocket(this.rootedIP);
    console.log(this.totalDeviceStatus);
    console.log(this.deviceListConfigurationData);

  }
  ngOnInit() {
    console.log(this.rootedIP);
    // if (this.rootedIP) this.websocketProvider.connectToSocket(this.rootedIP);
    // this.ws = new WebSocket("ws://localhost:8082");
    //   this.ws.addEventListener("open",()=>{
    //     console.log('connected');

    // })

    //   if(this.websocketProvider.checkSocketConnection()){
    //     console.log("susbsfkjs");
    //   this.websocketProvider.getData().subscribe((data) => {
    //     console.log("data from server", data);
    //   });
    // }

    this._subscription = this.deviceListFormatterProvider.rootedIPChange.subscribe(
      (value) => {
        this.rootedIP = value;
      }
    );
    this._subscription = this.deviceListFormatterProvider.fanSpeedChange.subscribe(
      (value) => {
        this.currentSpeed = value;
      }
    );
    // this._subscription = this.deviceListFormatterProvider.objChange.subscribe(
    //   (value) => {
    //     this.deviceListConfigurationData = value;
    //   }
    // );
  }

  // checkStatus() {
  //   const url = `http://${this.rootedIP}/getStatus`;
  //  // const url1="https://api.mocki.io/v1/5aca1f25";
  //   console.log(url, "getStatusAPI");
  //   this.deviceStatusCheckProvider
  //     .checkDeviceStatus(url)
  //     .then((data) => {
  //       console.log(data, "getStatus data received");
  //       this.updatedeviceStatus(data);
  //     })
  //     .catch((error) => {
  //       console.log("getStatus data not received");
  //     });
  // }
  // updatedeviceStatus(deviceData) {
  //   console.log("getstatus called");
  //   if (deviceData !== "") {
  //     for (let i = 0; i < this.deviceListConfigurationData.length; i++) {
  //       for (let k = 0; k < this.deviceListConfigurationData[i].length; k++) {
  //         if(deviceData[this.deviceListConfigurationData[i][k].deviceID]!=='undefined'){
  //         this.totalDeviceStatus[this.deviceListConfigurationData[i][k].index] =
  //           deviceData[this.deviceListConfigurationData[i][k].deviceID];
  //         }
  //       }
  //     }
  //   }
  // }

  updateDeviceStatus(index, switchStatus) {
    this.totalDeviceStatus[index] = switchStatus;
  }
  deviceSwitchClicked(device: any, index, deviceIndex) {
    this.updateDeviceStatus(index, !this.totalDeviceStatus[index]);
    let deviceStatus = false;
    if (this.totalDeviceStatus[index]) deviceStatus = true;
    this.sendDeviceInfoToSocket(device, deviceStatus);

    // const url = `http://${this.rootedIP}/${device.deviceID}?message=${deviceStatus}`;
    // const url1="http://arduino.esp8266.com/stable/package_esp8266com_index.json";
    // console.log(url, "deviceAPI");



    // this.deviceStatusCheckProvider
    //   .checkDeviceStatus()
    //   .subscribe((data) => {
    //     console.log(data, "device statusdata received");
    //     this.deviceStatusResponse(
    //       index,
    //       this.totalDeviceStatus[index],
    //       deviceIndex
    //     );
    //   })
  }
  decrement(){
    if(this.currentSpeed>0)
this.currentSpeed--;
  }
  increment(){
    if(this.currentSpeed<4)
  this.currentSpeed++;
  }
  sendDeviceInfoToSocket(device, deviceStatus) {
    console.log("device",device);
    if (this.websocketProvider.checkSocketConnection){

      if(device.name ==='Fan'){
        this.websocketProvider.sendData({
          "MsgNmbr": "102",
          "Pin": device.deviceID,
          "State": deviceStatus,
          "Speed":this.currentSpeed,
          "NodeName": device.nodeValue.toString(),
        });

      }else
      this.websocketProvider.sendData({
        "MsgNmbr": "101",
        "Pin": device.deviceID,
        "State": deviceStatus,
        "NodeName": device.nodeValue.toString(),
      });

    }
  }

  updateToggle(toggleValue, index, device) {
    let deviceStatus = false;
    this.updateDeviceStatus(toggleValue, index);
    if (this.totalDeviceStatus[index]) deviceStatus = true;
    this.sendDeviceInfoToSocket(device, deviceStatus);
  }
  //to do later
  updateToggleItem(deviceName: String) {}

  // deviceStatusResponse(index, deviceStatus, deviceIndex) {
  //   this.totalDeviceStatus[index] = deviceStatus;
  //   this.deviceListFormatterProvider.setDeviceListConfiguration(
  //     this.roomIndex,
  //     deviceIndex,
  //     deviceStatus
  //   );
  //   console.log(this.totalDeviceStatus, "totaldeviceStatus");
  // }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
