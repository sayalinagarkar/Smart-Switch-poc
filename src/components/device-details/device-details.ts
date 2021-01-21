import { Component, Input } from '@angular/core';
import { RoomDetailsProvider } from '../../providers/room-details/room-details';

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
  deviceType='bulb';
  deviceName='';
  deviceTypeIcon='../../assets/imgs/bulb.png';
  @Input() deviceList;
  @Input() index;
  constructor( private roomDetailsProvider:RoomDetailsProvider) {
    console.log('Hello DeviceDetailsComponent Component');
    this.text = 'Hello World';
  }
  ngOnChanges() {

  }
   selectDevice(value){
    console.log(value);
    this.deviceTypeIcon=this.deviceList[value];
    this.roomDetailsProvider.addNewDeviceType(this.index,value);
  }
  addDeviceName(){
        this.roomDetailsProvider.addNewDeviceName(this.index,this.deviceName);
  }
}
