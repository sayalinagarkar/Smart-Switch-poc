import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { WelcomeHomePage } from '../welcome-home/welcome-home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  houseName='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,private storage:Storage) {
  }

  ionViewDidLoad() {
  }

  navigateToWelcomeHome(){
if(this.houseName!==''){
  this.storage.set('houseName',this.houseName);
  this.navCtrl.push(WelcomeHomePage,{houseName:this.houseName});
}else{
  const alert = this.alertCtrl.create({
    title: 'Please enter house name',
    buttons: ['OK']
  });
  alert.present();
}
  }
}
