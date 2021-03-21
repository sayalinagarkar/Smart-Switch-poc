import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { DeviceListFormatterProvider } from '../device-list-formatter/device-list-formatter';
import { IMqttMessage, MqttModule, MqttService } from 'ngx-mqtt';
/*
  Generated class for the WebsocketProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class WebsocketProvider  {
  ws;
  rootedIP:String;
  rootedIPRange=['192.168.29.125','192.168.29.126','192.168.29.127','192.168.29.128','192.168.29.129','192.168.29.130'];
  //rootedIPRange=['192.168.0.25','192.168.0.26','192.168.0.27','192.168.0.28','192.168.0.29','192.168.0.30',
    //              '192.168.0.31','192.168.0.32','192.168.0.33','192.168.0.34','192.168.0.35']
  loading:any;
  isSocketConnected:boolean=false;
  constructor(private deviceListFormatterProvider: DeviceListFormatterProvider,
    public alertCtrl: AlertController,public loadingCtrl: LoadingController,public httpClient: HttpClient, private _mqttService: MqttService
    ) {

}
// async getRootedIPData(){
//   this.loading = this.loadingCtrl.create({
//     content: 'Connecting...'
//   });
//   let foundRootedIPFlag=false;
//   for(let rootedIPIndex = 0; rootedIPIndex < this.rootedIPRange.length;rootedIPIndex++)
//   {
//     foundRootedIPFlag=false;
//     this.loading.present();
//      const result = await this.checkCorrectUrl(this.rootedIPRange[rootedIPIndex])
//      if(result){
//       this.rootedIP = result + ":81/";
//       console.log("Rooted IP is");
//       console.log(this.rootedIP);
//       foundRootedIPFlag=true;
//       break;
//      }
//   }
//   if(!foundRootedIPFlag){
//     const alert = this.alertCtrl.create({
//             title: 'No correct rooted IP found',
//             subTitle: 'Please try again',
//             buttons: [

//               {
//                 text: 'close',
//                 handler: () => {

//                 }
//               },
//               {
//                 text: 'Try again',
//                 handler: () => {
//                   this.getRootedIPData();
//                 }
//               }
//             ]
//           });
//   }
//   if (this.rootedIP)
//   {
//     this.connectToSocket(this.rootedIP);
//   }
// }
// async checkCorrectUrl(ip): Promise<any> {
//   try {
//     const headers = new HttpHeaders().set('Content-Type','text/plain; charset=utf-8')
//     const response = await this.httpClient.get(`http://${ip}/getIP`,{headers,responseType:'text'}).pipe(
//       timeout(2000)
//     ).toPromise();
//     return response
//   } catch (err) {
//     return false;
//   }
// }

//This method is used to connect to socket
  connectToSocket(rootedIP:String){
    this.rootedIP=rootedIP;
    let loading = this.loadingCtrl.create({
          content: 'Connecting with rooted IP...'
        });
        loading.present();
    this.ws = new WebSocket(`ws://${rootedIP}`);
    //this.ws = new WebSocket(`ws://localhost:8082`);
    setTimeout(() => {
    loading.dismiss();
  }, 4000);
  console.log(`ws://${rootedIP}`);

       this.ws.addEventListener("open",()=>{
         console.log("connected");
       loading.dismiss();


  });
//   this.ws.addEventListener("error",()=>{

//     const alert = this.alertCtrl.create({
//       title: 'Oh,snap something went wrong',
//       subTitle: 'Please try again',
//       buttons: [

//         {
//           text: 'close',
//           handler: () => {

//           }
//         },
//         {
//           text: 'Try again',
//           handler: () => {
//             this.connectToSocket(this.rootedIP);
//           }
//         }
//       ]
//     });

//     setTimeout(()=>{    alert.present();
//     },4000);

// });
this.ws.addEventListener('close', (event) => {

  const alert = this.alertCtrl.create({
    title: 'Oops,connection has been closed',
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
  console.log('The connection has been closed successfully.');
});

  }


  //This method is used for receiving data from websocket server
  getData() {
    let observable = new Observable(observer => {
      this.ws.addEventListener('message', (data) => {
        console.log("getData");
        console.log("data from server",data);
        observer.next(data.data);
      });

    })
    return observable;


  }

  //This method is used for receiving data from Mqtt server
  getMqttData() {
    let observable = new Observable(observer => {
      this._mqttService.observe('onpower/client1/from').subscribe((message: IMqttMessage) => 
      {
        console.log(message.payload.toString());
        observer.next(message.payload.toString());
      });

    })
    return observable;


  }
  

//This method is used for sending data to socket
sendData(deviceInfo:any){
  //JSON.stringify(obj);
  console.log(JSON.stringify(deviceInfo));
  if(this.ws)
  {
    this.ws.send(JSON.stringify(deviceInfo)); //need yto uncomment
  }
  else
  {
    this._mqttService.unsafePublish("onpower/client1/to", JSON.stringify(deviceInfo), {qos: 0, retain: false});
  }
}
closeWebserver(){
  this.ws.addEventListener("close",()=>{
console.log("closed connedction")
  });
}

}
