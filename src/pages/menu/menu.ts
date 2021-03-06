import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  homePage: Component;
  WooCommerce: any;
  categories: any[];
  @ViewChild('content') childNavCrtl: NavController;
  loggedin: boolean;
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController, private woocommerce: WooCommerceProvider) {
    this.homePage = 'HomePage'
    this.categories = [];
    this.user = {};

    this.WooCommerce = this.woocommerce.initialize();

    this.WooCommerce.getAsync("products/categories").then((data)=>{
      let temp: any[] = JSON.parse(data.body).product_categories;
      for(let i = 0 ; i < temp.length ; i++){
        if(temp[i].parent == 0 ){
          this.categories.push(temp[i]);
        }
      }
    },(err)=>{
      console.log(err)
    });
  }

  ionViewDidEnter() {
    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo) =>{
        if(userLoginInfo != null){
          this.user = userLoginInfo.user[0];
          this.loggedin = true;
        }else{
          this.user = {};
          this.loggedin = false;
        }
      });
    });
  }

  OpenCategoryPage(category) {
    this.navCtrl.push('ProductsByCategoryPage', {"category": category});
  }

  openPage(pageName:string){
    if(pageName == "signup"){
      this.navCtrl.push('SignupPage', {"user": this.user.id});
    }else if(pageName == "login"){
      this.navCtrl.push('LoginPage');
    }else if(pageName == "cart"){
      let modal = this.modalCtrl.create('CartPage');
      modal.present();
    }else if(pageName == "logout"){
      this.storage.remove("userLoginInfo").then(()=>{
        this.user = {};
        this.loggedin = false;
        this.navCtrl.setRoot('IntroPage');
      });
    }else if(pageName == "order"){
      let modal = this.modalCtrl.create('OrderPage');
      modal.present();
    }
  }
}
