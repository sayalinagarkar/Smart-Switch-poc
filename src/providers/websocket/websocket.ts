import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
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
  rootedIP1:String;
  isSocketConnected:boolean=false;

  rootedIPRange=['192.168.29.125','192.168.29.126','192.168.29.127','192.168.29.128','192.168.29.129','192.168.29.130'];
  constructor(private deviceListFormatterProvider: DeviceListFormatterProvider,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController
    ) {

}

//This method is used to connect to socket
  connectToSocket(rootedIP:String){

    let stopFlag=false;

   let loading = this.loadingCtrl.create({
            content: 'Connecting...'
          });
    for(let i=0;i<this.rootedIPRange.length;i++){
      stopFlag=false;
    this.rootedIP1=this.rootedIPRange[i];

    this.ws = new WebSocket(`ws://${this.rootedIP1}:81`);
    //this.ws = new WebSocket(`ws://localhost:8082`);




  loading.present();
setTimeout(() => {
    loading.present();
}, 1000);

  console.log("trying to connect with:",`ws://${this.rootedIP1}`);

       this.ws.addEventListener("open",()=>{
         console.log("connected");
         this.rootedIP=this.rootedIP1;
         this.connectToSocketAgain();
       loading.dismiss();
        stopFlag=true;


  });
  if(stopFlag)
  {
    console.log("connected with IP",`ws://${this.rootedIP1}`);
    break;
  }
}
if(!stopFlag){
loading.dismiss();
   const alert = this.alertCtrl.create({
      title: 'Cannot Connect to server',
      subTitle: 'Please try again',
      buttons: [

        {
          text: 'close',
          handler: () => {

          }
        },
        {
          text: 'Try again',
          handler: () => {
            this.connectToSocket(this.rootedIP);
          }
        }
      ]
    });
    alert.present();

}





}
connectToSocketAgain(){
  const alert = this.alertCtrl.create({
    title: 'Connected',
    subTitle: '',
    buttons: [

      {
        text: 'close',
        handler: () => {

        }
      },

    ]
  });
  this.ws = new WebSocket(`ws://${this.rootedIP}:81`);

  this.ws.addEventListener("open",()=>{
    console.log("connected with ",`ws://${this.rootedIP}:81`);
    alert.present();


});

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
  this.ws.send(JSON.stringify(deviceInfo)); //need yto uncomment
}

closeWebserver(){
  this.ws.addEventListener("close",()=>{
console.log("closed connedction")
  });
}

}
