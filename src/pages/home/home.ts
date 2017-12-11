import { Component } from '@angular/core';
import { NavController, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';
import { SearchPage } from '../search/search';
import { CartPage } from '../cart/cart';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number;
  search:string = "";

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private woocommerce: WooCommerceProvider, public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

    this.page = 2;

    this.WooCommerce = this.woocommerce.initialize();

    let loading = loadingCtrl.create({
      content: 'Carregando os dados da loja.'
    });
    loading.present();
    this.WooCommerce.getAsync("products").then((data)=>{
      this.products = JSON.parse(data.body).products;
      loading.dismiss();
    },(err)=>{
      console.log(err);
      loading.dismiss();
    });

    this.loadMoreProducts(null);
  }

  ionViewDidLoad(){

  }

  loadMoreProducts(event){
    if(event == null){
      this.page = 2;
      this.moreProducts = [];
    }else{
      this.page ++;
    }

    this.WooCommerce.getAsync("products?page="+ this.page).then((data)=>{
      this.moreProducts = this.moreProducts.concat(JSON.parse(data.body).products);

      if(event != null){
        event.complete();
        if(JSON.parse(data.body).products.length < 10){
          event.enable(false);
          this.toastCtrl.create({
            message:"Não existem mais produtos!",
            duration: 3000
          }).present();
        }
      }
    },(err)=>{
      console.log(err)
    });
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, { "product": product });
  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

  onSearch(event){
    if(this.search.length > 0){
      this.navCtrl.push(SearchPage, {"search": this.search});
    }
  }

}
