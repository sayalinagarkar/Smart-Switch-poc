import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { DeviceListFormatterProvider } from '../device-list-formatter/device-list-formatter';

/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class WebsocketProvider  {
  ws;
  rootedIP:String;
  isSocketConnected:boolean=false;
  constructor(private deviceListFormatterProvider: DeviceListFormatterProvider,
    public alertCtrl: AlertController,
    ) {

}
 connectToWebSocket(rootedIP:String) {
  return new Promise(function(resolve, reject) {
    //this.ws = new WebSocket(`ws://${rootedIP}`);
    //this.ws = new WebSocket(`ws://localhost:8082`);
    this.ws.addEventListener("open",()=>{
resolve("success");
    });
    this.ws.addEventListener("error",(error)=>{
      reject(error);
    })
  });
}

//This method is used to connect to socket
  connectToSocket(rootedIP:String){
console.log("connct")
  this.ws = new WebSocket(`ws://${rootedIP}`);
  //this.ws = new WebSocket(`ws://localhost:8082`);
       this.ws.addEventListener("open",()=>{
        this.sendData({
          "MsgNmbr": "103",
          "NodeName":  "1",
        });
  });
  this.ws.addEventListener("error",()=>{
    const alert = this.alertCtrl.create({
      title: 'Oh,snap something went wrong',
      subTitle: 'please try again',
      buttons: [

        {
          text: 'close',
          handler: () => {

          }
        }
      ]
    });
    alert.present();

});
  }

  //This method is used to check connection
  checkSocketConnection():boolean{
    if (this.ws.readyState === WebSocket.OPEN) {
      return true;
    }
    else{
      return false;
    }

}
  //This method is used for receiving data from websocket server
  getData() {
    let observable = new Observable(observer => {
      this.ws.addEventListener('message', (data) => {
        console.log("data from server",data);
        observer.next(data.data);
      });
    })
    return observable;


  }


//This method is used for sending data to socket
sendData(deviceInfo:any){
  //JSON.stringify(obj);
  console.log(JSON.stringify(deviceInfo));
this.ws.send(JSON.stringify(deviceInfo));
}

}
