import { Component, Input, OnInit } from "@angular/core";
import { DeviceListFormatterProvider } from "../../providers/device-list-formatter/device-list-formatter";
import { DeviceStatusCheckProvider } from "../../providers/device-status-check/device-status-check";
import { Subscription } from "rxjs/Subscription";
import { WebsocketProvider } from "../../providers/websocket/websocket";
import { RoomDetailsProvider } from "../../providers/room-details/room-details";

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
  switchBoardList=[]

  //deviceListConfigurationData: any;
  _subscription: Subscription;
  constructor(
    private deviceListFormatterProvider: DeviceListFormatterProvider,
    private websocketProvider: WebsocketProvider,
    private roomDetailsProvider:RoomDetailsProvider
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
    console.log(this.roomIndex);
    this.switchBoardList =this.roomDetailsProvider.getSwitchBoardList(this.roomIndex);
    console.log(this.switchBoardList,"switchBoard");



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
    this._subscription = this.roomDetailsProvider.fanSpeedChange.subscribe(
      (value) => {
        this.currentSpeed = value;
        console.log(value,"fanSpeed");
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
    this.updateDeviceStatus(device.index, !this.totalDeviceStatus[device.index]);
    let deviceStatus = false;
    if (this.totalDeviceStatus[device.index]) deviceStatus = true;
    //console.log()
    this.sendDeviceInfoToSocket(device, deviceStatus); //need to uncomment

     }
  decrement(device,deviceStatus){
    if(this.currentSpeed>0)
this.currentSpeed--;
if(deviceStatus)
this.sendDeviceInfoToSocket(device, deviceStatus);


  }
  increment(device,deviceStatus){
    if(this.currentSpeed<4)
  this.currentSpeed++;
  if(deviceStatus)
this.sendDeviceInfoToSocket(device, deviceStatus);
  }
  sendDeviceInfoToSocket(device, deviceStatus) {
    console.log("device",device);
   // if (this.websocketProvider.checkSocketConnection){

      if(device.name ==='Fan'){
        this.websocketProvider.sendData({
          "MsgNmbr": "102",
          "Pin": device.deviceID,
          "Status": deviceStatus,
          "Speed":this.currentSpeed,
          "NodeName": device.nodeValue.toString(),
        });

      }else
      this.websocketProvider.sendData({
        "MsgNmbr": "101",
        "Pin": device.deviceID,
        "Status": deviceStatus,
        "NodeName": device.nodeValue.toString(),
      });

 //   }
  }

  updateToggle(toggleValue, switchBoardIndex,index, device) {
    let deviceStatus = false;
    this.updateDeviceStatus( device.index,toggleValue,);
    if (this.totalDeviceStatus[device.index]) deviceStatus = true;
    this.sendDeviceInfoToSocket(device, deviceStatus);
    this.roomDetailsProvider.updateToggleChangesDetails(toggleValue,switchBoardIndex,index,this.roomIndex);
  }


  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
