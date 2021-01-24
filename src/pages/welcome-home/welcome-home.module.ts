import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WelcomeHomePage } from './welcome-home';

@NgModule({
  declarations: [
    WelcomeHomePage,
  ],
  imports: [
    IonicPageModule.forChild(WelcomeHomePage),
  ],
})
export class WelcomeHomePageModule {}
