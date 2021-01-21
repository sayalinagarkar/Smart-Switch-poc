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
        nodeValue:1,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay1',
        Speed:0

      },
      {
        name: "Bulb",
        index:1,
        nodeValue:1,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay2',
        Speed:0

      },
      {
        name: "Bulb",
        index:2,
        nodeValue:1,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay3',
        Speed:0

      },
      {
        name: "Fan",
        index:3,
        nodeValue:1,
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: false,
        deviceID:'Fan',
        Speed:0
      },


    ],
    [
      {
        name: "Bulb",
        index:4,
        nodeValue:2,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay1',
        Speed:0

      },

      {
        name: "Fan",
        index:5,
        nodeValue:2,
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: false,
        deviceID:'Fan1',
        Speed:0
      },
    ],
    [
      {
        name: "Bulb",
        index:6,
        nodeValue:3,
        iconUrl: "../../assets/imgs/bulb.png",
        iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
        toggleValue: false,
        deviceID:'Relay1',
        Speed:0

      },
      {
        name: "Fan",
        index:7,
        nodeValue:3,
        iconUrl: "../../assets/imgs/fan.png",
        iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
        toggleValue: false,
        deviceID:'Fan1',
        Speed:0
      },

    ],
  ];

  rootedIP = "";
  hardCoded = "192.168.29.236";
  key='rootedIP';
  fanSpeed='';
  fanSpeedChange: Subject<number> = new Subject<number>();
  rootedIPChange: Subject<string> = new Subject<string>();
  devicetypeList={
    bulb:"../../assets/imgs/bulb.png",
    tubelight:"../../assets/imgs/bulb.png",
    fan:"../../assets/imgs/fan.png",
    ac:"../../assets/imgs/ac.png"

};
  constructor(private storage: Storage) {}

//   setNewDeviceData(data1:string){
//    let data=JSON.parse(data1);
// let msgNumber=data.MsgNmbr;
// let node=this.obj[Number(data.NodeName)];
// let currentRoom=0;//from room details
// console.log(data["NodeName"]);
//     switch(msgNumber){
//       case 201:;
//       for(let i=0;i<currentRoom.length;i++){
//        if(currentRoom[i].deviceID===data['Pin']){
//         currentRoom[i].toggleValue=data['State'];

//         console.log(data[currentRoom[i].deviceID]);
//        }
//       }
//       break;
//       case 202:
//         for(let i=0;i<currentRoom.length;i++){
//           if(currentRoom[i].deviceID===data['Pin'])
//           {
//             console.log("in 202");
//           currentRoom[i].toggleValue=data['State'];
//           currentRoom[i].Speed=Number(data['FanSpeed']);
//           this.fanSpeedChange.next(Number(data['FanSpeed']));
//           }
//         }
//         break;
//       case 203: if(currentRoom.length>0){
//         for(let i=0;i<currentRoom.length;i++){
//           currentRoom[i].toggleValue = data[currentRoom[i].deviceID];
//           if(currentRoom[i].name==='Fan'){
//           currentRoom[i].Speed=Number(data['FanSpeed']);
//           this.fanSpeedChange.next(Number(data['FanSpeed']));

//           }
//         }
//       }
//       break;
//       default:
//     }
//   //  {"MsgNmbr":"203","NodeName":"1","Relay1":"1","Relay2":"0","Relay3":"1","Fan1":"0"}




//   }
  getDeviceTypeList(){
    return this.devicetypeList;
  }

  getDeviceListConfiguration() {
    return this.obj;
  }

// setDeviceListConfiguration(roomIndex,deviceIndex,deviceStatus){
//     this.obj[roomIndex][deviceIndex].toggleValue = !deviceStatus;
// }

setRootedIP(rootedIP) {
     this.rootedIPChange.next(rootedIP);
    this.storage.set(this.key, rootedIP);
    this.rootedIP = rootedIP;
}

getRootedIPValueFromStorage()  {
    return new Promise((resolve, reject) => { this.storage.get(this.key).then((value) => {
      console.log('Your rootedIP is', value);
      resolve(value);
    }).catch((error)=>{
      reject(error);
    });
  });

  }


  }
