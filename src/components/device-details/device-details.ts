import { Component } from '@angular/core';

/**
 * Generated class for the DeviceDetailsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'device-details',
  templateUrl: 'device-details.html'
})
export class DeviceDetailsComponent {

  text: string;
  deviceType='';
  deviceName='';
  constructor() {
    console.log('Hello DeviceDetailsComponent Component');
    this.text = 'Hello World';
  }
  selectDevice(value){
    console.log(value);

  }
}
