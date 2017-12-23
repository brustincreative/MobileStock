import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { PayPal } from '@ionic-native/paypal';

import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { WooCommerceProvider } from '../providers/woocommerce/woocommerce';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    PayPal,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WooCommerceProvider,
    OneSignal
  ]
})
export class AppModule {}
