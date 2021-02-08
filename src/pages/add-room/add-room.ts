import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RoomDetailsProvider } from '../../providers/room-details/room-details';
import { RoomSwitchContainerPage } from '../room-switch-container/room-switch-container';

/**
 * Generated class for the AddRoomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-room',
  templateUrl: 'add-room.html',
})
export class AddRoomPage {
roomName='';
rooms=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl:AlertController,
    public roomDetailsProvider:RoomDetailsProvider) {
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad AddRoomPage');
  }

  addRoom(){
this.rooms= this.roomDetailsProvider.getAllRoomDetails();
if(this.roomName!=='')
{
//  console.log(this.roomName);
//  console.log(this.rooms);
//  console.log(this.rooms.findIndex(item => this.roomName.toLowerCase() === item.toLowerCase()))
  if(this.rooms.length!==0 && this.rooms.findIndex(item => this.roomName.toLowerCase() === item.toLowerCase())!==-1

  ){
    const alert = this.alertCtrl.create({
      title: 'This room has been already added,Please enter different room',
      buttons: ['OK']
    });
    alert.present();
  }

  else{
    this.roomDetailsProvider.addNewRoom(this.roomName);
    this.navCtrl.setRoot(RoomSwitchContainerPage,{rooms:this.rooms});
  }

}
else{
  const alert = this.alertCtrl.create({
    title: 'Please enter room name',
    buttons: ['OK']
  });
  alert.present();
}
  }
}
