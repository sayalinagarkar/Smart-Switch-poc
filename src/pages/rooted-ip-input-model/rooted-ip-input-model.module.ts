import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RootedIpInputModelPage } from './rooted-ip-input-model';

@NgModule({
  declarations: [
    RootedIpInputModelPage,
  ],
  imports: [
    IonicPageModule.forChild(RootedIpInputModelPage),
  ],
})
export class RootedIpInputModelPageModule {}
