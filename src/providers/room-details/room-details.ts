import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

/*
  Generated class for the RoomDetailsProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RoomDetailsProvider {
  rooms = ['Bedroom'];
  deviceArray = [];
  fanSpeed='';
  fanSpeedChange: Subject<number> = new Subject<number>();

  createRoomData = [
    //total start
    [
      //room  start
      [
        //switchboard1 start
        {
          name: "Bulb",
          index: 0,
          nodeValue: 1,
          iconUrl: "../../assets/imgs/bulb.png",
          iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
          toggleValue: false,
          deviceID: "Relay1",
          Speed: 0,
        },
        {
          name: "Bulb",
          index: 1,
          nodeValue: 1,
          iconUrl: "../../assets/imgs/bulb.png",
          iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
          toggleValue: false,
          deviceID: "Relay2",
          Speed: 0,
        },
        {
          name: "Plug",
          index: 2,
          nodeValue: 1,
          iconUrl: "../../assets/imgs/socket.png",
          iconUrlSwitchOn: "../../assets/imgs/socket-on.png",
          toggleValue: false,
          deviceID: "Relay3",
          Speed: 0,
        },
        {
          name: "Fan",
          index: 3,
          nodeValue: 1,
          iconUrl: "../../assets/imgs/fan.png",
          iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
          toggleValue: false,
          deviceID: "Fan1",
          Speed: 0,
        },
      ],
    ], //room 1 end
  ]; //total end

  //createRoomData=[];
  deviceDetails = [{ name: "", type: "" }];
  switchBoardList = [
    { name: "SwitchBoard1", roomNumber: 1, node: 1 },
  ];
  switchBoardIndex = 0;
  deviceIndex = 0;
  deviceId = [];
  //totalRoomData=[];
  constructor(public http: HttpClient) {
    console.log("Hello RoomDetailsProvider Provider");
    for (let i = 0; i < 2; i++) {
      //this.createRoomData.push([]);//room added
    }
  }

  getRoomNumberContainingSwitchBoard(node){
for(let i=0;i<this.switchBoardList.length;i++){
  if(this.switchBoardList[i].node===node)
  return this.switchBoardList[i].roomNumber;
}
  }
  addNewRoom(newRoom) {
    this.rooms.push(newRoom);
    this.createRoomData.push([]);
  }
  getAllRoomDetails() {
    return this.rooms;
  }

  createAndAssignDeviceIndexArray() {
    let index = 0;
    for (let i = 0; i < this.createRoomData.length; i++) {
      //room
      for (let j = 0; j < this.createRoomData[i].length; j++) {
        //no of switchBoard
        for (let k = 0; k < this.createRoomData[i][j].length; k++) {
          //devices
          this.deviceArray[index] = this.createRoomData[i][j][k].toggleValue;
          this.createRoomData[i][j][k].index = index;
          index++;
        }
      }
    }
    console.log("deviceArray", this.deviceArray);
   // console.log("roomdetails", this.createRoomData);
  }

  updateToggleChangesDetails(toggleValue,switchBoardIndex,index,currentRoom){

    console.log(currentRoom,"currtRrrom in updateTofflChangesDetails");
    this.createRoomData[currentRoom][switchBoardIndex][index].toggleValue=toggleValue

}
  getDeviceArray(){
    return this.deviceArray;
  }
  getAllDetails() {
    return this.createRoomData;
  }
  createDeviceDetailsArary(length, currentRoom) {
    this.deviceDetails = [];
    for (let i = 0; i < length; i++) {
      this.deviceDetails.push({ name: "Device" + (i + 1), type: "bulb" });
    }
  }
  deleteRoom(roomIndex) {
    this.rooms.splice(roomIndex, 1);
    return this.rooms;
  }

  addNewDeviceName(index, name) {
    this.deviceDetails[index]["name"] = name;
  }
  addNewDeviceType(index, type) {
    this.deviceDetails[index]["type"] = type;
  }
  getDeviceDetails() {
    return this.deviceDetails;
  }

  checkSwitchBoardNameAlreadyExist(switchBoardName, currentRoom) {
    if (this.switchBoardList.length === 0) return false;
    for (let i = 0; i < this.switchBoardList.length; i++) {
      if (
        this.switchBoardList[i].name.toLowerCase() ===
          switchBoardName.toLowerCase() &&
        this.switchBoardList[i].roomNumber === currentRoom + 1
      ) {
        this.switchBoardIndex = i;
        return true;
      }
    }
    return false;
  }

  findswitchBoardIndexInRoom(currentRoom,nodeValue1) {
    //let nodeValue1 = this.switchBoardList[this.switchBoardIndex].node;
    // console.log(nodeValue1);
    // console.log(this.createRoomData[currentRoom].length);
    // console.log(this.createRoomData);
    for (let i = 0; i < this.createRoomData[currentRoom].length; i++) { //length undefined
      for (let j = 0; j < this.createRoomData[currentRoom][i].length; j++) {
     //   console.log(this.createRoomData[currentRoom][i][j].nodeValue);
        if (this.createRoomData[currentRoom][i][j].nodeValue === nodeValue1)
          return i;
      }
    }
  }
  addNewSwitchBoardName(switchBoardName, currentRoom) {
    let nextNode = this.switchBoardList.length + 1;
    let alradyExist = false;
    if (!this.checkSwitchBoardNameAlreadyExist(switchBoardName, currentRoom)) {
      this.switchBoardList.push({
        name: switchBoardName,
        roomNumber: currentRoom + 1,
        node: nextNode,
      });
      alradyExist = false;
      this.switchBoardIndex = this.switchBoardList.length - 1;
    } else {
      alradyExist = true;
    }
    //console.log(this.switchBoardList);

    // this.switchBoardIndex = this.switchBoardList.findIndex(
    //   (item) => switchBoardName.toLowerCase() === item.name.toLowerCase());
    //console.log(this.switchBoardIndex);
    this.createDeviceId(this.switchBoardIndex, alradyExist, currentRoom);
    this.getcreatedDeviceDetails(currentRoom, alradyExist);
  //  this.storage.set('AllDetails','')
  }
  getSwitchBoardList(currenRoom) {
    let switchBoardListInCurrenRoom = [];
    for (let i = 0; i < this.switchBoardList.length; i++) {
      if (this.switchBoardList[i].roomNumber === currenRoom + 1)
        switchBoardListInCurrenRoom.push(this.switchBoardList[i]);
    }
    return switchBoardListInCurrenRoom;
  }
  getDeviceIconUrl(isDeviceOn, index) {
    let url = "";
    switch (this.deviceDetails[index].type) {
      case "bulb":
        url = isDeviceOn
          ? "../../assets/imgs/bulb-on.png"
          : "../../assets/imgs/bulb.png";
        break;
      case "tubelight":
        url = isDeviceOn
          ? "../../assets/imgs/bulb-on.png"
          : "../../assets/imgs/bulb.png";
        break;
      case "ac":
        url = isDeviceOn
          ? "../../assets/imgs/ac-on.png"
          : "../../assets/imgs/ac.png";
        break;
      case "fan":
        url = isDeviceOn
          ? "../../assets/imgs/fan-on.png"
          : "../../assets/imgs/fan.png";
        break;
      default:
    }
    return url;
  }

  createDeviceId(switchBoardIndex, switchBoardalreadyExist, currentRoom) {
    if (switchBoardalreadyExist) {
      //count already added device
      this.deviceId = [];

      let relayNumber = 1,
        fanNumber = 1;
      let switchBoardIndexInRoom = this.findswitchBoardIndexInRoom(currentRoom,this.switchBoardList[this.switchBoardIndex].node);
      //console.log(switchBoardIndexInRoom);
      let startIndex = this.createRoomData[currentRoom][switchBoardIndexInRoom].length;
      for (let i = 0; i < startIndex; i++) {
        let len = this.createRoomData[currentRoom][switchBoardIndexInRoom][i]
          .deviceID.length;
        if (
          this.createRoomData[currentRoom][switchBoardIndexInRoom][
            i
          ].deviceID.slice(0, len - 1) === "Relay"
        ) {
          relayNumber++;
          //  this.deviceId[i]='Relay'+relayNumber;
        } else {
          fanNumber++;
          // this.deviceId[i]='Fan'+fanNumber;
        }
      } //for deviceid count
      for (
        let i = startIndex;
        i < startIndex + this.deviceDetails.length;
        i++
      ) {
        if (this.deviceDetails[i - startIndex].type == "fan") {
          this.deviceId[i - startIndex] = "Fan" + fanNumber++;
        } else {
          this.deviceId[i - startIndex] = "Relay" + relayNumber++;
        }
      }
    } //close if
    else {
      this.deviceId = [];
      let relayNumber = 1,
        fanNumber = 1,
        switchBoardCountInRoom = this.createRoomData[currentRoom].length;
      this.createRoomData[currentRoom].push([]); //new switchboard in that rooom

      for (let i = 0; i < this.deviceDetails.length; i++) {
        //this.createRoomData[currentRoom][switchBoardCountInRoom].push({});//to add device

        if (this.deviceDetails[i].type == "fan") {
          this.deviceId[i] = "Fan" + fanNumber++;
        } else {
          this.deviceId[i] = "Relay" + relayNumber++;
        }
      }
      //console.log(this.createRoomData);
      //add new direct
    }
  }
  getcreatedDeviceDetails(currentRoom, switchBoardAlreadyExist) {
    let switchBoardIndexInRoom = 0;
    if (switchBoardAlreadyExist) {
      switchBoardIndexInRoom = this.findswitchBoardIndexInRoom(currentRoom,this.switchBoardList[this.switchBoardIndex].node);
    } else {
      switchBoardIndexInRoom = this.createRoomData[currentRoom].length - 1;
    }
    for (let i = 0; i < this.deviceDetails.length; i++) {
      let obj = {
        name: this.deviceDetails[i].name,
        index: this.deviceIndex++,
        nodeValue: this.switchBoardList[this.switchBoardIndex].node,
        iconUrl: this.getDeviceIconUrl(false, i),
        iconUrlSwitchOn: this.getDeviceIconUrl(true, i),
        toggleValue: false,
        deviceID: this.deviceId[i],
        Speed: 0,
      };
      this.createRoomData[currentRoom][switchBoardIndexInRoom].push(obj);
      this.createAndAssignDeviceIndexArray();

      // this.totalRoomData[0][i]=obj;
      console.log("obj", this.createRoomData);
    }
  }
  createAllDetailsObject() {
    let obj = [
      [
        {
          name: "Bulb",
          index: 1,
          nodeValue: 1,
          iconUrl: "../../assets/imgs/bulb.png",
          iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
          toggleValue: false,
          deviceID: "Relay2",
          Speed: 0,
        },
        {
          name: "Bulb",
          index: 2,
          nodeValue: 1,
          iconUrl: "../../assets/imgs/bulb.png",
          iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
          toggleValue: false,
          deviceID: "Relay3",
          Speed: 0,
        },
      ],
      [
        {
          name: "Bulb",
          index: 4,
          nodeValue: 2,
          iconUrl: "../../assets/imgs/bulb.png",
          iconUrlSwitchOn: "../../assets/imgs/bulb-on.png",
          toggleValue: false,
          deviceID: "Relay1",
          Speed: 0,
        },

        {
          name: "Fan",
          index: 5,
          nodeValue: 2,
          iconUrl: "../../assets/imgs/fan.png",
          iconUrlSwitchOn: "../../assets/imgs/fan-on.png",
          toggleValue: false,
          deviceID: "Fan1",
          Speed: 0,
        },
      ],
    ];
  }

  setNewDeviceData(data1:string){
    let data=JSON.parse(data1);
 let msgNumber=data.MsgNmbr;
 console.log(msgNumber,"msgNumber");
 let node=Number(data.NodeName);
 let currentRoom=this.getRoomNumberContainingSwitchBoard(node)-1;//from room details
 console.log(currentRoom, "currentRoom");
 console.log(node,"node");
 let switchBoardIndexInRoom=this.findswitchBoardIndexInRoom(currentRoom,node);
 console.log(switchBoardIndexInRoom,"switchBoardIndexINROom");
 console.log(data["NodeName"]);
     switch(msgNumber){
       case 201:
         console.log("in 201");
       for(let i=0;i<this.createRoomData[currentRoom][switchBoardIndexInRoom].length;i++){
        if(this.createRoomData[currentRoom][switchBoardIndexInRoom][i].deviceID===data['Pin']){
          this.createRoomData[currentRoom][switchBoardIndexInRoom][i].toggleValue=data['Status'];

         console.log(this.createRoomData[currentRoom][switchBoardIndexInRoom][i].toggleValue);
        }

       }
       break;
       case 202:
         for(let i=0;i<this.createRoomData[currentRoom][switchBoardIndexInRoom].length;i++){
           if(this.createRoomData[currentRoom][switchBoardIndexInRoom][i].deviceID===data['Pin'])
           {
             console.log("in 202");
             this.createRoomData[currentRoom][switchBoardIndexInRoom][i].toggleValue=data['Status'];
             this.createRoomData[currentRoom][switchBoardIndexInRoom][i].Speed=Number(data['FanSpeed']);
           this.fanSpeedChange.next(Number(data['FanSpeed']));
           }
         }
         break;
       case 203: if(this.createRoomData[currentRoom][switchBoardIndexInRoom].length>0){
         for(let i=0;i<this.createRoomData[currentRoom][switchBoardIndexInRoom].length;i++){
          this.createRoomData[currentRoom][switchBoardIndexInRoom][i].toggleValue = data[this.createRoomData[currentRoom][switchBoardIndexInRoom][i].deviceID];
           if(this.createRoomData[currentRoom][switchBoardIndexInRoom][i].deviceID==='Fan1'){
            this.createRoomData[currentRoom][switchBoardIndexInRoom][i].Speed=Number(data['FanSpeed']);
           // console.log(Number(data['FanSpeed']));
           this.fanSpeedChange.next(Number(data['FanSpeed']));

           }
         }
       }
       break;
       default:
     }
   //  {"MsgNmbr":"203","NodeName":"1","Relay1":"1","Relay2":"0","Relay3":"1","Fan1":"0"}




   }
}