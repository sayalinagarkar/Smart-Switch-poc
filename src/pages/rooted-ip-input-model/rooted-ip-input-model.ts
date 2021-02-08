import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DeviceListFormatterProvider } from '../../providers/device-list-formatter/device-list-formatter';
import { HomePage } from '../home/home';
import { RoomSwitchContainerPage } from '../room-switch-container/room-switch-container';

/**
 * Generated class for the RootedIpInputModelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-rooted-ip-input-model',
  templateUrl: 'rooted-ip-input-model.html',
})
export class RootedIpInputModelPage {
rootedIP:string='';

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController,public toastController: ToastController,
    private deviceListFormatterProvider: DeviceListFormatterProvider) {
      this.deviceListFormatterProvider
      .getRootedIPValueFromStorage()
      .then((value) => {
        this.rootedIP = value.toString();

      })
      .catch((error) => {
        this.rootedIP = "";
      })
  }

  ionViewDidLoad() {
  }
  addRootedIP(){
    this.deviceListFormatterProvider.setRootedIP(this.rootedIP);
    this.navCtrl.setRoot(RoomSwitchContainerPage);
    const toast = this.toastController.create({
      message: 'Your rooted IP has been added.',
      duration: 2000,

    });
    toast.present();
  }
  closeModel() {
    this.viewCtrl.dismiss();
  }
}
