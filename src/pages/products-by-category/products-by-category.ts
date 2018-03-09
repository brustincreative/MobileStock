import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';

@IonicPage()
@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {

  WooCommerce: any;
  products: any[];
  page:number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, private woocommerce: WooCommerceProvider, public loadingCtrl: LoadingController) {
    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = this.woocommerce.initialize();

    let loading;
    loading = this.loadingCtrl.create({
      content: 'Carregando informações do produto...'
    });
    loading.present();
    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug).then((data)=>{
      //console.log(JSON.parse(data.body));
      this.products = JSON.parse(data.body).products;
      loading.dismiss();
    },(err)=>{
      loading.dismiss();
      console.log(err)
    });


  }


  loadMoreProducts(event){
    this.page ++;
    //console.log("Getting page" + this.page);

    this.WooCommerce.getAsync("products?filter[category]="+ this.category.slug +"&page="+ this.page).then((data)=>{
      let temp:any[] = JSON.parse(data.body).products;
      this.products = this.products.concat(JSON.parse(data.body).products);
      //console.log(this.products);
      event.complete();

      if(temp.length < 10){
        event.enable(false);
        this.toastCtrl.create({
          message:"Não existem mais produtos!",
          duration: 5000
        }).present();
      }


    },(err)=>{
      console.log(err)
    });
  }

  openProductPage(product){
    this.navCtrl.push('ProductDetailsPage', { "product": product });
  }

  back(){
    this.navCtrl.push('HomePage');
  }

}
