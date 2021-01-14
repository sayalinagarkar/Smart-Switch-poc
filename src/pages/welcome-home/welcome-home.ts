import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';

/**
 * Generated class for the WelcomeHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome-home',
  templateUrl: 'welcome-home.html',
})
export class WelcomeHomePage {
houseName='';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.houseName=this.navParams.get('houseName');
    console.log(this.houseName);
  }

  ionViewDidLoad() {
    this.houseName=this.navParams.get('houseName');
    console.log(this.houseName,"ion");
    console.log('ionViewDidLoad WelcomeHomePage');
  }

  navigateToAddRoom(){
this.navCtrl.push(AddRoomPage);
  }
}
