import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-thank',
  templateUrl: 'thank.html',
})
export class ThankPage {
  message:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.message = `Obrigado por realizar seu pedido.
                    Em até 24 horas entraremos em contato para confirmar as informações.`
  }

  closeModal(){
    this.navCtrl.popAll();
  }

}
