import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search:string = "";
  WooCommerce:any;
  products:any[] = [];
  page:number = 2;
  loading:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public woocommerce: WooCommerceProvider, public loadingCtrl: LoadingController) {
    this.search = this.navParams.get("search");
    this.WooCommerce = this.woocommerce.initialize();
    this.loading = this.loadingCtrl.create({
                    content: 'Buscando...'
                    });
    this.loading.present();
    this.WooCommerce.getAsync("products?filter[q]="+this.search).then((searchData) =>{
      this.products = JSON.parse(searchData.body).products;
      this.loading.dismiss();
    })
  }

  loadMoreProducts(event){
    this.WooCommerce.getAsync("products?filter[q]="+this.search+"&page="+this.page).then((searchData) =>{
      this.products = this.products.concat(JSON.parse(searchData.body).products);

      if(JSON.parse(searchData.body).products.length < 10){
        event.enable(false);
      }
      event.complete();
      this.page ++;

    })

  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, { "product": product });
  }

}
