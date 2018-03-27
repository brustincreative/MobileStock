import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController  } from 'ionic-angular';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  page:number;
  orders: any[];
  WooCommerce:any;
  customerId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, public loadingCtrl: LoadingController, public woocommerce: WooCommerceProvider, public storage: Storage ) {
    this.page = 1;

    this.WooCommerce = this.woocommerce.initialize();

    this.loadingCtrl.create({
      content: 'Carregando...',
      duration: 4000
    }).present();

    this.storage.get("userLoginInfo").then((data)=>{
      this.customerId = data.user[0].id;
    });

    this.WooCommerce.getAsync("orders?filter[customer]="+ this.customerId).then((data)=>{
      this.orders =  JSON.parse(data.body).orders;
      console.log(this.orders);
    }, (err)=>{
      console.log(err);
    });
  }

  ionViewDidLoad() {

  }

  loadMoreOrders(event){
    this.page ++;
    this.WooCommerce.getAsync("orders?filter[customer]="+ this.customerId +"&page="+ this.page).then((data)=>{
      let temp:any[] = JSON.parse(data.body).orders;
      this.orders = this.orders.concat(JSON.parse(data.body).orders);
      //console.log(this.products);
      event.complete();

      if(temp.length < 10){
        event.enable(false);
        this.toastCtrl.create({
          message:"Não existem mais pedidos!",
          duration: 3000
        }).present();
      }


    },(err)=>{
      console.log(err)
    });
  }


  openOrderPage(order){
    this.navCtrl.push('OrderDetailsPage', { "order": order });
  }

}
