import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the DeviceListFormatterProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceListFormatterProvider {
  obj = [
    [
      {
        name: "Bulb",
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: "false",
        deviceID:'Relay1'
      },
      {
        name: "Refrigerator",
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: "false",
        deviceID:'Relay2'
      },
      {
        name: "Fan",
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: "false",
        deviceID:'Relay3'
      },
      {
        name: "Air Conditioner",
        iconUrl: "../../assets/imgs/ac.png",
        iconUrlSwitchOn: "../../assets/imgs/ac-on.png",
        toggleValue: "false",
        deviceID:'Relay4'
      },
    ],
    [
      {
        name: "Bulb",
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: "false",
        deviceID:'Relay5'
      },
      {
        name: "Refrigerator",
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: "false",
        deviceID:'Relay5'
      },
      {
        name: "Fan",
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: "false",
        deviceID:'Relay6'
      },
    ],
    [
      {
        name: "Bulb",
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: "false",
        deviceID:'Relay7'
      },
      {
        name: "Refrigerator",
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: "false",
        deviceID:'Relay8'
      },
    ],
  ];

  rootedIP = "";
  hardCoded = "192.168.29.236";
  constructor() {}

  getDeviceListConfiguration() {
    return this.obj;
  }
  setRootedIP(rootedIP) {
    this.rootedIP = rootedIP;
  }
  getRootedIP(): String {
    return this.rootedIP !== "" ? this.getRootedIP.toString() : this.hardCoded;
  }
}
