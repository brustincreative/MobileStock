import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newUser: any = {};
  userInfo: any;
  editing: boolean = false;
  validForm: boolean = true;

  constructor(public navCtrl: NavController, public storage: Storage, public http: Http, public navParams: NavParams, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    let idUser = this.navParams.get("user");
    if(idUser){
      this.http.get('http://mobilestock-com-br.umbler.net/api/user.php?action=listaById&user=' + idUser).subscribe( (data) => {
        let res = data.json();
        this.newUser.name = res[0].nome;
        this.newUser.email= res[0].email;
        this.newUser.subscription= res[0].inscricao;
        this.newUser.cpf_cnpj= res[0].cpf_cnpj;
        this.newUser.username= res[0].username;
        this.newUser.password= res[0].password;
        this.newUser.telefone= res[0].telefone;
        this.newUser.address= res[0].endereco;
        this.newUser.city= res[0].bairro;
        this.newUser.cep= res[0].CEP;
        this.newUser.id= res[0].id;
      });
    } 
  }

  checkEmail(){
    let validEmail = false;
    let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(reg.test(this.newUser.email)){
      //email looks valid
      this.http.get('http://mobilestock-com-br.umbler.net/api/user.php?action=verifyEmail&user=' + this.newUser.email).subscribe( (data) => {
        let res = data.json();

        if(res.length == 0){
          validEmail = true;
          this.validForm = true;
          this.toastCtrl.create({
            message: "Ótimo. Email válido.",
            duration: 3000
          }).present();

        } else {
          if(!this.newUser.id)
          {
            validEmail = false;
            this.validForm = false;
            this.toastCtrl.create({
              message: "Email já registrado. Favor verificar.",
              showCloseButton: true
            }).present();
          }
        }
      })
    } else {
      validEmail = false;
      this.validForm = false;
      this.toastCtrl.create({
        message: "Email inválido. Favor verificar.",
        showCloseButton: true
      }).present();
    }
  }

  signup(){
      let customerData = {}
      customerData = {
        "name": this.newUser.name,
        "email": this.newUser.email,
        "subscription":this.newUser.subscription,
        "cpf_cnpj": this.newUser.cpf_cnpj,
        "username": this.newUser.username,
        "password": this.newUser.password,
        "telefone": this.newUser.telefone,
        "address": this.newUser.address,
        "city": this.newUser.city,
        "cep": this.newUser.cep,
        "gender": "0",
        "id": this.newUser.id,
      }
      if(!this.validForm){
        this.alertCtrl.create({
          title: "Email Inválido",
          message: "Seu email já existe em nosso banco de dados!",
          buttons: [{
            text: "Tentar novamente",
            
          }]
        }).present();
        return;
      }else{
        if(
          this.newUser.name &&
          this.newUser.email &&
          this.newUser.cpf_cnpj &&
          this.newUser.username &&
          this.newUser.password &&
          this.newUser.telefone &&
          this.newUser.address  &&
          this.newUser.city &&
          this.newUser.cep
        ){
          this.http.post("http://mobilestock-com-br.umbler.net/api/user.php", customerData).subscribe((data) => {
            let response = data.json();
            if(response.lastInsertId){
              if(this.newUser.id){
                this.alertCtrl.create({
                  title: "Conta alterada",
                  message: "Sua conta foi alterada com sucesso!",
                  buttons: [{
                    text: "Ok",
                    
                  }]
                }).present();
              }else{
                this.alertCtrl.create({
                title: "Conta criada",
                message: "Sua conta foi criada com sucesso! Favor realizar login para seguir.",
                buttons: [{
                  text: "Ok",
                  handler: ()=> {
                    this.navCtrl.setRoot('LoginPage');
                  }
                }]
              }).present();
              }
              
            }
          }, err => { console.log(err) })
        }else{
          this.alertCtrl.create({
            title: "Preenchimento correto",
            message: "Todos os campos com o * devem ser preenchidos.",
            buttons: [{
              text: "Tentar novamente",
              
            }]
          }).present();
          return;
        }
      } 
    }

}
