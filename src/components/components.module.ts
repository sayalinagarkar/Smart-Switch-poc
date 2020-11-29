import { NgModule } from '@angular/core';
import { SwitchBoxComponent } from './switch-box/switch-box';
import { BrowserModule } from '@angular/platform-browser';

import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [SwitchBoxComponent],
	imports: [
    BrowserModule,
    IonicModule],
	exports: [SwitchBoxComponent]
})
export class ComponentsModule {}
