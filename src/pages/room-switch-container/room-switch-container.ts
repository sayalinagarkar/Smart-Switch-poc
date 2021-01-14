import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController, AlertController } from 'ionic-angular';
import { RoomDetailsProvider } from '../../providers/room-details/room-details';
import { AddRoomPage } from '../add-room/add-room';

/**
 * Generated class for the RoomSwitchContainerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-room-switch-container',
  templateUrl: 'room-switch-container.html',
})
export class RoomSwitchContainerPage {
  @ViewChild("slider") slider: Slides;
  deviceListConfiguration='';

  rooms:any=[''];
  pages="0";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public roomDetailsProvider:RoomDetailsProvider,
    public toastController:ToastController,public alertCtrl:AlertController) {
   this.rooms= this.roomDetailsProvider.getAllRoomDetails();
  }
  categoryChanged($event){

  }
  addRoom(){
    this.navCtrl.push(AddRoomPage);

  }
  addDevice(){

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomSwitchContainerPage');
  }
  selectedTab(index) {
    this.slider.slideTo(index);
  }
  moveSlider($event){
    this.pages = this.slider.getActiveIndex().toString();

  }
  deleteRoom(){
    //add logic that only if room is empty can delete
    let currentIndex = this.slider._activeIndex;
    console.log(currentIndex);
    this.rooms=this.roomDetailsProvider.deleteRoom(currentIndex);
    this.pages="0";
    console.log(this.rooms);
    const toast =this.toastController.create({
      message:'room deleted',
      duration:2000
    });
toast.present()

  }

  deleteDevice(){

  }
}
