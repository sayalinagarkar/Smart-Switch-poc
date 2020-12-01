import { HttpClient } from "@angular/common/http";
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

  checkDeviceStatus(urlString: string) {
    return new Promise((resolve, reject) => {
      this.http.get<any>(urlString).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (error) => {
          reject(error);
        },
      });
    });
  }


getStatus(urlString){
  return new Promise((resolve, reject) => {
    this.http.get<any>(urlString).subscribe({
      next: (data) => {
        resolve(data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
}



}
