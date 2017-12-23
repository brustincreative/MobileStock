import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroPage } from '../pages/intro/intro';
import { OneSignal } from '@ionic-native/onesignal';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'IntroPage';

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public oneSignal: OneSignal) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
     if (this.platform.is('cordova')) {
       this.oneSignal.startInit('0aa965b2-ee29-4d40-8bfc-e55abaee1597', '848609388484');

       this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

       this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
       });

       this.oneSignal.handleNotificationOpened().subscribe(() => {
         // do something when a notification is opened
       });

       this.oneSignal.endInit();
     }
  }
}
