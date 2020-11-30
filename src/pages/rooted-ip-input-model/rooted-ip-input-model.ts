import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { createTemplateMiddle } from 'typescript';
import { DeviceListFormatterProvider } from '../../providers/device-list-formatter/device-list-formatter';

/**
 * Generated class for the RootedIpInputModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rooted-ip-input-model',
  templateUrl: 'rooted-ip-input-model.html',
})
export class RootedIpInputModelPage {
rootedIP:string='';
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,public toastController: ToastController,
    private deviceListFormatterProvider: DeviceListFormatterProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RootedIpInputModelPage');
  }
  addRootedIP(){
    this.deviceListFormatterProvider.setRootedIP(this.rootedIP);
    const toast = this.toastController.create({
      message: 'Your rooted IP has been added.',
      duration: 2000,

    });
    toast.present();
  }
  closeModel() {
    console.log(this.rootedIP);
    this.viewCtrl.dismiss();
  }
}
