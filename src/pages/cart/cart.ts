import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';
import { Http } from '@angular/http';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  WooCommerce:any;
  cartItems: any[] = [];
  total: any;//total without discount
  sumQty: any = 0;//qty of all itens
  discount: any;//message for discount
  percent:any;//total with discount
  value:any;
  showEmptyCartMessage: boolean = false;
  showDiscountMessage: boolean = false;
  user: any;
  array:any[] = [];

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController ,public http: Http, public toastCtrl: ToastController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController, public woocommerce: WooCommerceProvider) {
    this.total = 0.0;
    this.sumQty = 0;
    this.percent = 0.0;
    this.value = 0.0;

    this.WooCommerce = this.woocommerce.initialize();

    let loading = loadingCtrl.create({
      content: 'Carregando os dados da loja.'
    });

    loading.present();
    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo) =>{
        if(userLoginInfo != null){
          this.user = userLoginInfo.user[0];

          this.http.get("http://mobilestock-com-br.umbler.net/api/cart.php?user="+this.user.id).subscribe((data)=>{
            this.cartItems = data.json();
            if(this.cartItems.length > 0){
              loading.dismiss();
              this.cartItems.forEach((item, index) => {
                let price = parseFloat(item.productPrice).toFixed(2);
                let qty = Number(item.qty)

                this.array.push([{
                  "title": item.title,
                  "name": item.productAttName,
                  "option": item.productAttOption,
                  "price": price,
                  "qty": Number(item.qty),
                  "featured_src": item.featured_src,
                  "mainProductID": item.mainProductID,
                }])
                this.total += item.productPrice * qty;
                this.sumQty += qty;
              });
              this.total = parseFloat(this.total).toFixed(2);
              if( this.sumQty >= 120 && this.sumQty <= 179 )
              {
                this.value = this.total * 0.01;
                this.percent = this.total - this.value;
                this.percent = parseFloat(this.percent).toFixed(2);
                this.showDiscountMessage = true;
                this.discount = "Desconto de 1% sobre o total da compra.";
              }else if(this.sumQty >= 180 && this.sumQty <= 239)
              {
                this.value = this.total * 0.02;
                this.percent = this.total - this.value;
                this.percent = parseFloat(this.percent).toFixed(2);
                this.showDiscountMessage = true;
                this.discount = "Desconto de 2% sobre o total da compra.";
              }else if(this.sumQty >= 240)
              {
                this.value = this.total * 0.025;
                this.percent = this.total - this.value;
                this.percent = parseFloat(this.percent).toFixed(2);
                this.showDiscountMessage = true;
                this.discount = "Desconto de 2,5% sobre o total da compra.";
              }
            }else{
              loading.dismiss();
              this.showEmptyCartMessage = true;
            }
          }, (err)=>{
            loading.dismiss();
            console.log(JSON.stringify(err))
            this.showEmptyCartMessage = true;
          });
        }
      });
    });
  }
  closeModal(){
    this.viewCtrl.dismiss();
  }
  checkout(){
    if(this.cartItems.length > 0){
      this.storage.get("userLoginInfo").then((data)=>{
        if(data != null){
          this.navCtrl.push('CheckoutPage');
        }else{
          this.navCtrl.push('LoginPage', {next: 'CheckoutPage'});
        }
      });
    }else{
      this.toastCtrl.create({
        message: "Lista não possui itens",
        duration: 3000,
      }).present();
    }
  }

  openProduct(item){
    var d = [];
    this.WooCommerce.getAsync('products/'+item).then((data) => {
      d = JSON.parse(data.body)
      this.navCtrl.push('ProductDetailsPage', d);       
    });
     
  }
}
