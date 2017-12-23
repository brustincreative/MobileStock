import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';

@NgModule({
  declarations: [
    CheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutPage),
  ],
  exports:[
    CheckoutPage
  ]
})
export class CheckoutPageModule {}
