import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DeviceListFormatterProvider } from '../../providers/device-list-formatter/device-list-formatter';
import { RoomDetailsProvider } from '../../providers/room-details/room-details';
import { RoomSwitchContainerPage } from '../room-switch-container/room-switch-container';

/**
 * Generated class for the AddDeviceDatailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-device-datails',
  templateUrl: 'add-device-datails.html',
})
export class AddDeviceDatailsPage {
  deviceCount;
  deviceList;
  totalDevice=[];
  switchBoardName='';
  selectedSwitchBoardName='';
  switchBoardList;
  addSwitchBoardPage=true;//navparam
  addDevicePage=false;//navparam
  currentRoom=0;//navparam
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private roomDetailsProvider:RoomDetailsProvider,
    public deviceListFormatterProvider:DeviceListFormatterProvider) {
      this.addSwitchBoardPage=this.navParams.get('addSwitchBoardPage');
      this.addDevicePage=this.navParams.get('addDevicePage');
      this.currentRoom=this.navParams.get('currentRoom');
    this.deviceList=this.deviceListFormatterProvider.getDeviceTypeList();
    this.switchBoardList=this.roomDetailsProvider.getSwitchBoardList(this.currentRoom);
    console.log(this.switchBoardList);
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad AddDeviceDatailsPage');
  }

  populateDeviceCard()
  {
    this.totalDevice=[];
    for(let i=0;i<this.deviceCount;i++)
        this.totalDevice.push(i);
   this.roomDetailsProvider.createDeviceDetailsArary(this.deviceCount,this.currentRoom);
  }

  submitDeviceDetails(){
//console.log(this.roomDetailsProvider.getDeviceDetails());
this.roomDetailsProvider.addNewSwitchBoardName(this.switchBoardName,this.currentRoom);
this.navCtrl.setRoot(RoomSwitchContainerPage );

  }

  selectSwitchBoard(value){
//console.log("seletedSwitchBoard",value);
this.switchBoardName=value;

  }
}
