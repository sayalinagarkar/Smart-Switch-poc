import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {RootedIpInputModelPage} from '../pages/rooted-ip-input-model/rooted-ip-input-model'
import { HomePage } from '../pages/home/home';
import { ModalController } from 'ionic-angular';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { WelcomePage } from '../pages/welcome/welcome';
import { WelcomeHomePage } from '../pages/welcome-home/welcome-home';
import { RoomSwitchContainerPage } from '../pages/room-switch-container/room-switch-container';
import { AddDeviceDatailsPage } from '../pages/add-device-datails/add-device-datails';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //rootPage: any = AddDeviceDatailsPage ;

  rootPage: any ;


  pages: Array<{title: string, component: any}>;
  houseName='';
  constructor(public platform: Platform,     private websocketProvider:WebsocketProvider
,    public statusBar: StatusBar, public splashScreen: SplashScreen,
public modalCtrl: ModalController,private storage: Storage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Change Rooted IP', component: RootedIpInputModelPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#025cbc');
      //this.statusBar.styleLightContent();
      this.splashScreen.hide();
      this.storage.get('houseName').then((value)=>{
        this.houseName=value;
        //console.log(this.houseName);
        if(this.houseName || this.houseName==='')
        this.rootPage=RoomSwitchContainerPage;
        else{
          this.rootPage=WelcomePage;

        }

      }).catch(()=>{
              this.rootPage=WelcomePage;
      });
  });
}
  openPage(page) {

    if(page.title==='Change Rooted IP'){
      const modal = this.modalCtrl.create(RootedIpInputModelPage);
      modal.present();
    }
     else
   this.nav.setRoot(page.component);
  }

}
