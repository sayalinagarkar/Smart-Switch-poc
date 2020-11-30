import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ComponentsModule }  from '../components/components.module';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DeviceListFormatterProvider } from '../providers/device-list-formatter/device-list-formatter';
import {RootedIpInputModelPage} from '../pages/rooted-ip-input-model/rooted-ip-input-model'
import { DeviceStatusCheckProvider } from '../providers/device-status-check/device-status-check';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RootedIpInputModelPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RootedIpInputModelPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceListFormatterProvider,
    DeviceStatusCheckProvider
  ]
})
export class AppModule {}
