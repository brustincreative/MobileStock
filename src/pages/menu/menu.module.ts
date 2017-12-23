import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from '../menu/menu';

@NgModule({
  declarations: [
    MenuPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
  exports:[
    MenuPage
  ]
})
export class MenuPageModule {}
