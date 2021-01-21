import { NgModule } from '@angular/core';
import { SwitchBoxComponent } from './switch-box/switch-box';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DeviceDetailsComponent } from './device-details/device-details';
@NgModule({
	declarations: [SwitchBoxComponent,
    DeviceDetailsComponent],
	imports: [
    BrowserModule,
    IonicModule],
	exports: [SwitchBoxComponent,
    DeviceDetailsComponent]
})
export class ComponentsModule {}
