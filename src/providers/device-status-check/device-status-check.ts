import { HttpClient,HttpClientJsonpModule, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { resolveDefinition } from "@angular/core/src/view/util";
import { errorHandler } from "@angular/platform-browser/src/browser";
import { Observable } from "rxjs";

/*
  Generated class for the DeviceStatusCheckProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceStatusCheckProvider {
  constructor(private http: HttpClient) {}

  // checkDeviceStatus(urlString: string) {
  //   const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

  //   return new Promise((resolve, reject) => {
  //     this.http.get(urlString,{ headers, responseType: 'text'}).subscribe({
  //       next: (data) => {
  //         console.log(data,"data received:next");
  //         resolve(data);
  //       },
  //       error: (error) => {
  //         console.log(error,"no data received:error");
  //         reject(error);
  //       },
  //     });
  //   });
  // }
checkDeviceStatus(){
  // return new Observable(observer => {
  //   this.socket.on('message', (data) => {
  //     observer.next(data);
  //   });
  // })
}

getStatus(urlString){
  const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

  return new Promise((resolve, reject) => {
      this.http.get(urlString,{ headers, responseType: 'text'}).subscribe({
      next: (data) => {
        console.log(data,"getStatus data received:next");
        resolve(data);
      },
      error: (error) => {
        console.log(error,"getStatus data received:error");

        reject(error);
      },
    });
  });
}



}
