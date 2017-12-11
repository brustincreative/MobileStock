import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { CartPage } from '../cart/cart';
import { WooCommerceProvider } from '../../providers/woocommerce/woocommerce';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  WooCommerce:any;
  product: any;
  reviews: any[] = [];
  variations:any[] = [];
  list:any[] = [];
  showPrice:boolean = true;
  qtdStock:any[] = [];
  hide:boolean = true;
  form:any[] = [];
  sentVariation: any = [];
  cartItems:any[];
  loading:any;
  user: any;
  goodTogo: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public storage: Storage, public toastCtrl: ToastController, private woocommerce: WooCommerceProvider, public modalCtrl: ModalController, public loadingCtrl:LoadingController) {
    this.goodTogo = false;
    this.variations = [];
    this.product = [];
    this.list = [];
    this.form = [];
    this.product = this.navParams.get("product");
    this.product.variations.forEach((item)=>{
      if(item.stock_quantity > 0 ){
          this.list.push(item);
          this.variations.push(item);
      }
    })
    this.WooCommerce = this.woocommerce.initialize();

    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo) =>{
        if(userLoginInfo != null){
          this.user = userLoginInfo.user;
        }
      });
    });

  }

  ionViewWillLeave() {
    if(this.goodTogo){
      this.navCtrl.setRoot(HomePage); //mantem page sempre refreshed.
    }
  }

  hidePrice(item){
    this.showPrice = item;
  }

  addToCart(items){
    this.goodTogo = true;
    this.cartItems = [];
    let stockAvaiable:boolean = false;
    this.loading = this.loadingCtrl.create({
      content: 'Adicionando item à lista de pedidos...'
    });
    this.loading.present();
    //reload products variations and push it in an array
    this.WooCommerce.getAsync('products/'+this.product.id).then((prod)=>{
      this.product = [];
      this.variations = [];
      this.list = [];
      this.product = JSON.parse(prod.body).product;
      this.product.variations.forEach((item)=>{
        if(item.stock_quantity > 0 ){
            this.list.push(item);
            this.variations.push(item);
        }
      })
      let counter = this.variations.length;

      for(let item in items.value){
        //check if quantity is empty
        if(items.value[item] != null && items.value[item] > 0 ){
          //verify stock quantity for each product variation
          for(let v = 0; v < counter; v++){
            //verify if item match variation
            if(this.variations[v].id == item){
              //verify if stock quantity greater than item quantity
              if(this.variations[v].stock_quantity >= items.value[item]){
                stockAvaiable = true;
              }else{
                this.loading.dismiss();
                this.toastCtrl.create({
                  message: "Quantidade de produto superior ao estoque.",
                  duration: 3000,
                }).present();
                return;
              }
              if(stockAvaiable){
                this.cartItems.push({
                  "product": JSON.stringify(this.variations[v]),
                  "productID": this.variations[v].id,
                  "mainProduct": JSON.stringify(this.product),
                  "title": this.product.title,
                  "qty": Number(items.value[item]),
                  "amount": parseFloat(this.variations[v].price) * items.value[item],
                  "featured_src":this.product.featured_src,
                  "iduser": this.user.id
                });
                this.variations[v].stock_quantity = this.variations[v].stock_quantity - items.value[item];
                let d = {
                  product:{}
                }
                d.product = {
                  "stock_quantity": this.variations[v].stock_quantity
                }
                this.WooCommerce.put('products/'+this.variations[v].id, d, function(err, data, res) {});
              }
            }
            //retira itens do carrinho com stockZero
            if(this.variations[v].stock_quantity == 0){
              this.list.splice(v, 1);
            }
          }
        }
      }

        this.http.get("http://mobilestock.com.br/wp-json/app/v1/cart?user="+this.user.id).subscribe((res)=>{
        let data = res.json();
        if(data == null || data.length == 0){
          data = [];
          this.cartItems.forEach(item => data.push(item));
        }else{
          this.cartItems.forEach((item, index) =>{
            let qty = 0;
            let added = 0;
            let dataProd;
            let product;

            data.forEach((element, i) =>{
              product = JSON.parse(element.product);

              if(product.id === item.productID){
                console.log("Produto já existe na lista de pedidos");

                qty = Number(data[i].qty);
                data[i].qty = qty + Number(item.qty);
                dataProd = JSON.parse(data[i].product);
                data[i].amount = parseFloat(data[i].amount) + (parseFloat(dataProd.price)*(item.qty));
                added = 1;
              }
            })
            if(added === 0){
              console.log("Produto novo");
              data.push(this.cartItems[index])
              added = 1;
            }
          });
        }      
        this.http.post("http://mobilestock.com.br/wp-json/app/v1/cart", data)
        .subscribe((res)=>{
          let response = res.json();
          if(response.error){
            this.toastCtrl.create({
              message: response.error,
              duration: 3000,
            }).present();
            return;
          }else{
            this.toastCtrl.create({
              message: "Lista atualizada",
              duration: 3000,
            }).present();
            this.loading.dismiss();
          }
        });

      },(err)=>{console.log(err);});

    });
  }

  openCart(){
    this.modalCtrl.create(CartPage).present();
  }

}
