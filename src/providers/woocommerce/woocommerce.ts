import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';

@Injectable()
export class WooCommerceProvider {

  WooCommerce: any;

  constructor() {
    this.WooCommerce = WC({
      url:"http://mobilestock.com.br/",
      consumerKey: "ck_0c5504551fd6ddb44786710cac963379962e8a26 ",
      consumerSecret: "cs_38efe8ad33e9f51542ee87b9740d8626fbec25f4"
    });
  }

  initialize(){
      return this.WooCommerce;
  }

}
