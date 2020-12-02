import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Subject } from "rxjs/Subject";


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
        index:0,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: "false",
        deviceID:'Relay1'
      },
      {
        name: "Refrigerator",
        index:1,
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: false,
        deviceID:'Relay2'
      },
      {
        name: "Fan",
        index:2,
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: false,
        deviceID:'Relay3'
      },
      {
        name: "Air Conditioner",
        index:3,
        iconUrl: "../../assets/imgs/ac.png",
        iconUrlSwitchOn: "../../assets/imgs/ac-on.png",
        toggleValue: false,
        deviceID:'Relay4'
      },
    ],
    [
      {
        name: "Bulb",
        index:4,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay5'
      },
      {
        name: "Refrigerator",
        index:5,
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: false,
        deviceID:'Relay6'
      },
      {
        name: "Fan",
        index:6,
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: false,
        deviceID:'Relay7'
      },
    ],
    [
      {
        name: "Bulb",
        index:7,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay8'
      },
      {
        name: "Refrigerator",
        index:8,
        iconUrl: "../../assets/imgs/fridge.png",
        iconUrlSwitchOn: "../../assets/imgs/fridge-on.png",
        toggleValue: false,
        deviceID:'Relay9'
      },
    ],
  ];

  rootedIP = "";
  hardCoded = "192.168.29.236";
  key='rootedIP';

  rootedIPChange: Subject<string> = new Subject<string>();
  constructor(private storage: Storage) {}

  getDeviceListConfiguration() {
    return this.obj;
  }

setDeviceListConfiguration(roomIndex,deviceIndex,deviceStatus){
    this.obj[roomIndex][deviceIndex].toggleValue = !deviceStatus;
}

setRootedIP(rootedIP) {
     this.rootedIPChange.next(rootedIP);
    this.storage.set(this.key, rootedIP);
    this.rootedIP = rootedIP;
}

getValueFromStorage()  {
    return new Promise((resolve, reject) => { this.storage.get(this.key).then((value) => {
      console.log('Your rootedIP is', value);
      resolve(value);
    }).catch((error)=>{
      reject(error);
    });
  });

  }


}
