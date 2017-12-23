import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openPage(pageName:string){
    if(pageName == "tour"){
      this.navCtrl.push('TourPage');
    }else if(pageName == "login"){
      this.navCtrl.push('LoginPage');
    }
  }

}
