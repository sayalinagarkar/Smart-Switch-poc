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
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { WebsocketProvider } from '../providers/websocket/websocket';
import { WelcomePage } from '../pages/welcome/welcome';
import { WelcomeHomePage } from '../pages/welcome-home/welcome-home';
import { AddRoomPage } from '../pages/add-room/add-room';
import { RoomSwitchContainerPage } from '../pages/room-switch-container/room-switch-container';
import { RoomDetailsProvider } from '../providers/room-details/room-details';
import { AddDeviceDatailsPage } from '../pages/add-device-datails/add-device-datails';
import { Observable } from 'rxjs/Observable';
import {
  IMqttMessage,
  MqttModule,
  MqttService
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS = {
  hostname: '3.95.5.223',
  port: 1883,
  username:'onpowermqtt',
  password:'onpowermqttserver',
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RootedIpInputModelPage,
    WelcomePage,
    WelcomeHomePage,
    AddRoomPage,
    RoomSwitchContainerPage,
    AddDeviceDatailsPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    }),
    IonicModule.forRoot(MyApp,{statusbarPadding: true})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RootedIpInputModelPage,
    WelcomePage,
    WelcomeHomePage,
    AddRoomPage,
    RoomSwitchContainerPage,
    AddDeviceDatailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DeviceListFormatterProvider,
    DeviceStatusCheckProvider,
    WebsocketProvider,
    RoomDetailsProvider,


  ]
})
export class AppModule {}




