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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  //rootPage: any = RoomSwitchContainerPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,     private websocketProvider:WebsocketProvider
,    public statusBar: StatusBar, public splashScreen: SplashScreen,public modalCtrl: ModalController) {
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
      this.statusBar.overlaysWebView(true);
      //this.statusBar.backgroundColorByHexString('#3498db');
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
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
