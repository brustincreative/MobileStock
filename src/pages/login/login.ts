import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;
  user: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public toastCtrl: ToastController, public storage: Storage, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.username = "";
    this.password = "";
  }

  ionViewDidEnter() {
    this.storage.ready().then(()=>{
      this.storage.get("userLoginInfo").then((userLoginInfo) =>{
        if(userLoginInfo != null){
          this.user = userLoginInfo.user;
          this.navCtrl.setRoot('MenuPage');
        }else{
          this.user = {};
        }
      });
    });
  }

  login(){
    this.loading = this.loadingCtrl.create({
      content: 'Conectando...'
    });
    this.loading.present();
    if(this.username != "" || this.password != ""){
      this.http.get("http://mobilestock.com.br/api/auth/generate_auth_cookie?insecure=cool&username="+this.username+"&password="+this.password)
      .subscribe((res)=>{
        this.loading.dismiss();
        let response = res.json();
        if(response.error){
          this.toastCtrl.create({
            message: response.error,
            duration: 3000,
          }).present();
          return;
        }

        this.storage.set("userLoginInfo", response).then((data)=>{
          this.alertCtrl.create({
            title:"Conectado com sucesso",
            message:"Você foi conectado no sistema com sucesso.",
            buttons:[{
              text:"OK",
              handler:()=> {
                this.navCtrl.setRoot('MenuPage');
              }
            }]
          }).present();
        });
      }, (err)=>{
        this.loading.dismiss();
        console.log(err);
      });
    }else{
      this.loading.dismiss();
      this.toastCtrl.create({
        message: "Informe o usuário e senha.",
        duration: 3000,
      }).present();
    }
  }
  redirection(send){
    if(send == "back"){
      this.navCtrl.push('IntroPage');
    }else if(send == "tour"){
      this.navCtrl.push('TourPage');
    }
  }

}
