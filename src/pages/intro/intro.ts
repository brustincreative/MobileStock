import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TourPage } from '../tour/tour';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }
  openPage(pageName:string){
    if(pageName == "tour"){
      this.navCtrl.push(TourPage);
    }else if(pageName == "login"){
      this.navCtrl.push(LoginPage);
    }
  }

}
