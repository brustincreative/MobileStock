import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  newOrder:any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same:boolean;
  WooCommerce: any;
  userInfo: any;
  totalQty: number = 0;
  subtotal:any = 0.00;//valor total da transação sem acresimo.
  total:any = 0.00; //controla o valor total da transação após acrescimo a prazo
  discount:any = 0.00;
  couponItems: any[] = [];
  value:any = 0.00;
  loading:any;

  constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public storage: Storage, public alertCtrl: AlertController, public toastCtrl: ToastController,private woocommerce: WooCommerceProvider, public loadingCtrl: LoadingController) {
    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      {method_id:"bacs", method_title:"Depósito"},
      {method_id:"cheque", method_title:"A prazo"},
    ];

    this.WooCommerce = this.woocommerce.initialize();

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    });
    this.loading.present();
    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo) =>{
        this.userInfo = userLoginInfo.user;
        let email = userLoginInfo.user.email;
        if(userLoginInfo != null){
          this.http.get("http://mobilestock-com-br.umbler.net/api/cart.php?user="+this.userInfo.id).subscribe((data)=>{
            let cart = data.json();
            cart.forEach((element, index) =>{
              this.totalQty = this.totalQty + Number(element.qty);
              this.subtotal = this.subtotal + (element.productPrice * Number(element.qty));
              this.total  = 0;
            });
            this.subtotal = parseFloat(this.subtotal).toFixed(2);
            // discount calc
            if( this.totalQty >= 120 && this.totalQty <= 179 )
            {
              let value: any = 0.00;
              value = this.subtotal * 0.01;
              value = parseFloat(value).toFixed(2);
              this.subtotal = this.subtotal - value;
              this.subtotal = parseFloat(this.subtotal).toFixed(2);
              this.couponItems.push({"id":173, "code":"desconto de 1%","amount":this.discount});

            }else if(this.totalQty >= 180 && this.totalQty <= 239)
            {
              let value: any = 0.00;
              value = this.subtotal * 0.02;
              this.subtotal = this.subtotal - value;
              this.subtotal = parseFloat(this.subtotal).toFixed(2);
              this.couponItems.push({"id":175,"code":"desconto de 2%","amount":this.discount});

            }else if(this.totalQty >= 240)
            {
              this.value = this.subtotal * 0.025;
              this.subtotal = this.subtotal - this.value;
              this.subtotal = parseFloat(this.subtotal).toFixed(2);
              this.couponItems.push({"id":176, "code":"desconto de 2,5%", "amount":this.discount});
            }
          }, (err)=>{
            console.log(err);
          });
          this.WooCommerce.getAsync("customers/email/"+email).then((data) =>{
            this.loading.dismiss();
            this.newOrder = JSON.parse(data.body).customer;
          });
        }
      });
    });
  }

  getDiscount(){
    this.total = 0.00;
    this.discount = 0.00;
    this.subtotal = Number.parseFloat(this.subtotal);

    if(this.paymentMethod == "bacs") {
      this.total = this.subtotal;
      this.total = parseFloat(this.total).toFixed(2);
    }
    else if(this.paymentMethod == "cheque"){
      this.value = this.subtotal * 0.1364;
      this.total = this.subtotal + this.value;
      this.discount = this.value - this.discount;
      this.discount = parseFloat(this.discount).toFixed(2);
      this.total = parseFloat(this.total).toFixed(2);
    }
  }

  setBillingToShipping(){
    this.billing_shipping_same = !this.billing_shipping_same;
    if(this.billing_shipping_same){
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }
  }

  placeOrder(){
    let orderItems: any[] = [];
    let data: any = {};
    let paymentData: any = {};
    let billing: any = this.newOrder.billing_address;
    console.log(billing);

    this.loading = this.loadingCtrl.create({
      content: 'Carregando...'
    })
    if(paymentData.method_id == ""){
      this.toastCtrl.create({
        message:"Metódo de pagamento não informado.",
        duration: 3000
      })
    }
    this.loading.present();
    this.paymentMethods.forEach((element, index) => {
      if(element.method_id == this.paymentMethod){
        paymentData = element;
      }
    });
    data = {
      method_title: paymentData.method_title,
      billing_address: billing.address_1,
      email: billing.email,
      name: this.userInfo.id || '',
      line_items: orderItems
    };
    console.log(data);

    if(paymentData.method_id == "bacs" || paymentData.method_id == "cheque"){
      this.http.get('http://mobilestock-com-br.umbler.net/api/cart.php?user='+this.userInfo.id).subscribe((res)=>{
        let cart = res.json();
        let perProductValue = this.total/this.totalQty

        cart.forEach((element, index) =>{
          let qty = Number.parseInt(element.qty);
          let totalProduct = qty * perProductValue

          orderItems.push({ product_id: element.mainProductID,
                            variation_id:element.productID,
                            quantity: qty,
                            subtotal:totalProduct,
                            total: totalProduct
                          });
        });
        data.line_items = orderItems;
        let orderData: any = {};
        orderData.order = data;

        this.http.post('http://mobilestock-com-br.umbler.net/api/checkout.php?user='+this.userInfo.id, data).subscribe((res)=>{
          console.log(res);
          this.loading.dismiss();
          this.navCtrl.push('ThankPage');
        },(err)=>{
          console.log(err)
          this.loading.dismiss()
        });
      })
    }else{
      this.loading.dismiss();
      this.toastCtrl.create({
        message:"Metódo de pagamento não informado.",
        duration: 3000
      }).present();
    }
  }
}
