webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__product_details_product_details__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CartPage = (function () {
    function CartPage(navCtrl, loadingCtrl, http, toastCtrl, navParams, storage, viewCtrl, woocommerce) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.woocommerce = woocommerce;
        this.cartItems = [];
        this.sumQty = 0; //qty of all itens
        this.showEmptyCartMessage = false;
        this.showDiscountMessage = false;
        this.array = [];
        this.total = 0.0;
        this.sumQty = 0;
        this.percent = 0.0;
        this.value = 0.0;
        this.WooCommerce = this.woocommerce.initialize();
        var loading = loadingCtrl.create({
            content: 'Carregando os dados da loja.'
        });
        loading.present();
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    _this.user = userLoginInfo.user;
                    _this.http.get("http://mobilestock.com.br/wp-json/app/v1/cart?user=" + _this.user.id).subscribe(function (data) {
                        _this.cartItems = data.json();
                        if (_this.cartItems.length > 0) {
                            loading.dismiss();
                            _this.cartItems.forEach(function (item, index) {
                                var product = JSON.parse(item.product);
                                var price = product.price;
                                var qty = Number(item.qty);
                                _this.array.push([{
                                        "title": item.title,
                                        "name": product.attributes["0"].name,
                                        "option": product.attributes["0"].option,
                                        "price": product.price,
                                        "qty": Number(item.qty),
                                        "featured_src": item.featured_src,
                                        "mainProduct": JSON.parse(item.mainProduct),
                                    }]);
                                _this.total += price * qty;
                                _this.sumQty += qty;
                            });
                            _this.total = parseFloat(_this.total).toFixed(2);
                            // discount calc
                            if (_this.sumQty >= 120 && _this.sumQty <= 179) {
                                _this.value = _this.total * 0.01;
                                _this.percent = _this.total - _this.value;
                                _this.percent = parseFloat(_this.percent).toFixed(2);
                                _this.showDiscountMessage = true;
                                _this.discount = "Desconto de 1% sobre o total da compra.";
                            }
                            else if (_this.sumQty >= 180 && _this.sumQty <= 239) {
                                _this.value = _this.total * 0.02;
                                _this.percent = _this.total - _this.value;
                                _this.percent = parseFloat(_this.percent).toFixed(2);
                                _this.showDiscountMessage = true;
                                _this.discount = "Desconto de 2% sobre o total da compra.";
                            }
                            else if (_this.sumQty >= 240) {
                                _this.value = _this.total * 0.025;
                                _this.percent = _this.total - _this.value;
                                _this.percent = parseFloat(_this.percent).toFixed(2);
                                _this.showDiscountMessage = true;
                                _this.discount = "Desconto de 2,5% sobre o total da compra.";
                            }
                        }
                        else {
                            loading.dismiss();
                            _this.showEmptyCartMessage = true;
                        }
                    });
                }
            });
        });
    }
    CartPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    CartPage.prototype.checkout = function () {
        var _this = this;
        if (this.cartItems.length > 0) {
            this.storage.get("userLoginInfo").then(function (data) {
                if (data != null) {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* CheckoutPage */]);
                }
                else {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */], { next: __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* CheckoutPage */] });
                }
            });
        }
        else {
            this.toastCtrl.create({
                message: "Lista não possui itens",
                duration: 3000,
            }).present();
        }
    };
    CartPage.prototype.openProduct = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__product_details_product_details__["a" /* ProductDetailsPage */], { "product": item });
    };
    CartPage.prototype.ionViewDidLeave = function () {
        //this.viewCtrl.dismiss();
    };
    return CartPage;
}());
CartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-cart',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\cart\cart.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Lista de produtos</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>Detalhes da lista de produtos</ion-col>\n\n      </ion-row>\n\n      <ion-row [hidden] = "!showEmptyCartMessage">\n\n        <ion-col>Nenhum produto adicionado à lista!</ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-card>\n\n  <ion-list>\n\n    <ion-item *ngFor="let item of array; let i = index" (click) = "openProduct(item[\'0\'].mainProduct)">\n\n      <ion-thumbnail item-left>\n\n        <img [src] = "item[\'0\'].featured_src" style="width: 60px !important; height:60px !important;" />\n\n      </ion-thumbnail>\n\n      <h2>{{item[\'0\'].title}}</h2>\n\n      <h3 style="font-size:15px;">{{item[\'0\'].name}} - {{item[\'0\'].option}}</h3>\n\n      <p>{{item[\'0\'].qty}} x R${{item[\'0\'].price}}</p>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-grid>\n\n    <ion-card>\n\n      <ion-grid>\n\n        <ion-row [hidden] = "!showDiscountMessage">\n\n          <ion-col><p style="font-size: 10px;" color="danger">{{discount}}<p></ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-4>\n\n            <b style="font-size:12px;">Quantidade</b>\n\n          </ion-col>\n\n          <ion-col col-8 style="text-align: right;">\n\n            {{ sumQty }}\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row>\n\n          <ion-col col-7>\n\n            <b style="font-size:12px;">Total à vista</b>\n\n          </ion-col>\n\n          <ion-col col-5 style="text-align: right;">\n\n            R$ {{ total }}\n\n          </ion-col>\n\n        </ion-row>\n\n        <ion-row [hidden] = "!showDiscountMessage">\n\n          <ion-col col-7>\n\n            <b style="font-size:12px;">Total com desconto</b>\n\n          </ion-col>\n\n          <ion-col col-5 style="text-align: right;">\n\n            R$ {{ percent }}\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card>\n\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <button ion-button color="primary" outline block (click) = "closeModal()">Continuar comprando</button>\n\n        </ion-col>\n\n        <ion-col>\n\n          <button ion-button color="primary" block (click) = "checkout()">Prosseguir com pedido</button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\cart\cart.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_6__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 163:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_search__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = (function () {
    function HomePage(navCtrl, toastCtrl, woocommerce, modalCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.woocommerce = woocommerce;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.search = "";
        this.page = 2;
        this.WooCommerce = this.woocommerce.initialize();
        var loading = loadingCtrl.create({
            content: 'Carregando os dados da loja.'
        });
        loading.present();
        this.WooCommerce.getAsync("products").then(function (data) {
            _this.products = JSON.parse(data.body).products;
            loading.dismiss();
        }, function (err) {
            console.log(err);
            loading.dismiss();
        });
        this.loadMoreProducts(null);
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        if (event == null) {
            this.page = 2;
            this.moreProducts = [];
        }
        else {
            this.page++;
        }
        this.WooCommerce.getAsync("products?page=" + this.page).then(function (data) {
            _this.moreProducts = _this.moreProducts.concat(JSON.parse(data.body).products);
            if (event != null) {
                event.complete();
                if (JSON.parse(data.body).products.length < 10) {
                    event.enable(false);
                    _this.toastCtrl.create({
                        message: "Não existem mais produtos!",
                        duration: 3000
                    }).present();
                }
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
    };
    HomePage.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]).present();
    };
    HomePage.prototype.onSearch = function (event) {
        if (this.search.length > 0) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__search_search__["a" /* SearchPage */], { "search": this.search });
        }
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <button ion-button menuToggle style="color: black;">\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title style="text-align:center;">Mobile Stock</ion-title>\n\n    <ion-buttons end>\n\n      <button ion-button icon-only (click)="openCart()" style="color: black;">\n\n        <ion-icon name="cart"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body" no-padding>\n\n  <ion-card>\n\n    <ion-slides autoplay="3000" pager>\n\n      <ion-slide>\n\n        <img src="http://placehold.it/350x150"/>\n\n      </ion-slide>\n\n      <ion-slide>\n\n        <img src="http://placehold.it/350x150"/>\n\n      </ion-slide>\n\n      <ion-slide>\n\n        <img src="http://placehold.it/350x150"/>\n\n      </ion-slide>\n\n      <ion-slide>\n\n        <img src="http://placehold.it/350x150"/>\n\n      </ion-slide>\n\n      <ion-slide>\n\n        <img src="http://placehold.it/350x150"/>\n\n      </ion-slide>\n\n    </ion-slides>\n\n  </ion-card>\n\n  <div style="padding-top:10px;">\n\n    <ion-searchbar  [(ngModel)]="search"  [showCancelButton]="shouldShowCancel"  (search) = "onSearch($event)">  </ion-searchbar>\n\n  </div>\n\n  <div class="line"> <hr/> </div>\n\n  <ion-title style="text-align:center;font-size:16px; text-transform:uppercase;">Nossos produtos</ion-title>\n\n  <div class="line"> <hr/> </div>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-6 col-sm *ngFor="let product of products" text-wrap (click) = "openProductPage(product)">\n\n        <ion-card no-padding>\n\n          <img [src]="product.featured_src"/>\n\n          <h3 style="padding: 10px;font-size: 15px;font-weight:bold;text-align:center;">{{product.title}}</h3>\n\n          <p style="padding: 10px; text-align: center; font-size: 12px;" [innerHtml] = "product.price_html"></p>\n\n        </ion-card>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-6 col-sm *ngFor="let product of moreProducts" text-wrap (click) = "openProductPage(product)">\n\n        <ion-card no-padding>\n\n          <img [src]="product.featured_src"/>\n\n          <h3 style="padding: 10px;font-size: 15px;font-weight:bold;text-align:center;">{{product.title}}</h3>\n\n          <p style="padding: 10px; text-align: center; font-size: 12px;" [innerHtml] = "product.price_html"></p>\n\n        </ion-card>\n\n      </ion-col>\n\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-infinite-scroll (ionInfinite) = "loadMoreProducts($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\home\home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TourPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__intro_intro__ = __webpack_require__(73);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TourPage = (function () {
    function TourPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.currentIndex = 0;
    }
    TourPage.prototype.goToSlideAfter = function () {
        var slideIndex = this.currentIndex + 1;
        this.slides.slideTo(slideIndex, 500);
    };
    TourPage.prototype.goToSlideBefore = function () {
        var slideIndex = this.currentIndex - 1;
        this.slides.slideTo(slideIndex, 500);
    };
    TourPage.prototype.slideChanged = function () {
        this.currentIndex = this.slides.getActiveIndex();
        console.log('Current index is', this.currentIndex);
    };
    TourPage.prototype.skipTour = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__intro_intro__["a" /* IntroPage */]);
    };
    return TourPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Slides */])
], TourPage.prototype, "slides", void 0);
TourPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-tour',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\tour\tour.html"*/'<ion-content class="body">\n  <span style="float:right;">\n  <button ion-button clear icon-right style="color:yellow" (click)="skipTour()" >Pular Tour\n     <ion-icon name="arrow-forward"></ion-icon>\n  </button>\n</span>\n  <ion-slides (ionSlideDidChange)="slideChanged()">\n    <ion-slide>\n      <ion-grid>\n        <ion-row class="wrapper">\n          <ion-col col-12 class="header">\n            <img src="assets/images/slide1-header.png" style="width: 60%;height: auto; margin-top:0;"/>\n          </ion-col>\n          <ion-col col-12 class="content">\n            <h3>Há muitos anos presenciamos inúmeras lojas de varejo fechando as portas, dentre os principais motivos são:</h3>\n            <div class="list">\n              <p><ion-icon name="home" style="color:yellow"></ion-icon> Custo com aluguel;</p>\n              <p><ion-icon name="stats" style="color:yellow"></ion-icon> Custo com mão de obra e excesso de encargos trabalhistas;</p>\n              <p><ion-icon name="logo-usd" style="color:yellow"></ion-icon> Impostos e taxas abusivas;</p>\n              <p><ion-icon name="thumbs-down" style="color:yellow"></ion-icon> Dificuldade de encontrar produtos de qualidade;</p>\n              <p><ion-icon name="nuclear" style="color:yellow"></ion-icon> Má gestão de estoque.</p>\n            </div>\n            <img src="assets/images/logo.png" style="width:150px;"/>\n          </ion-col>\n          <ion-col col-12 class="btnContainer">\n            <button ion-button outline style="float:right;" (click)="goToSlideAfter()">\n              <p>Próximo <ion-icon name="fastforward"></ion-icon></p>\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n    <ion-slide>\n      <ion-grid>\n        <ion-row class="wrapper">\n          <ion-col col-12 class="header">\n            <img src="assets/images/slide2-header.png" style="width: 60%;height: auto; margin-top:0;"/>\n          </ion-col>\n          <ion-col col-12 class="content">\n            <h3>O Mobile Stock é uma solução para todas as ineficiências de estoque para lojas varefistas.</h3>\n            <div class="list">\n              <p><ion-icon name="arrow-dropright-circle" style="color:yellow"></ion-icon> Tenha um estoque próprio de nossas empresas;</p>\n              <p><ion-icon name="arrow-dropright-circle" style="color:yellow"></ion-icon> Faça devolução de itens caso não venda;</p>\n              <p><ion-icon name="arrow-dropright-circle" style="color:yellow"></ion-icon> Pague à vista ou parcelado no cartão;</p>\n              <p><ion-icon name="arrow-dropright-circle" style="color:yellow"></ion-icon> Maior agilidade para realizar seus pedidos;</p>\n              <p><ion-icon name="arrow-dropright-circle" style="color:yellow"></ion-icon> Grande quantidade de fabricantes.</p>\n            </div>\n            <img src="assets/images/logo.png" style="width:150px;"/>\n          </ion-col>\n          <ion-col col-12 class="btnContainer">\n            <ion-col col-6>\n              <button ion-button outline style="float:left;" (click)="goToSlideBefore()">\n                <p><ion-icon name="rewind"></ion-icon> Anterior</p>\n              </button>\n            </ion-col>\n            <ion-col col-6>\n              <button ion-button outline style="float:right;" (click)="goToSlideAfter()">\n                <p>Próximo <ion-icon name="fastforward"></ion-icon></p>\n              </button>\n            </ion-col>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n    <ion-slide>\n      <ion-grid>\n        <ion-row class="wrapper">\n          <ion-col col-12 class="header">\n            <img src="assets/images/slide3-header.png" style="width: 60%;height: auto; margin-top:0; line-height: 22px;"/>\n          </ion-col>\n          <ion-col col-12 class="content">\n            <div class="list">\n              <p style="font-size:14px">\n                <span>1</span> Faça seu cadastro;\n              </p>\n              <p style="font-size:14px">\n                <span>2</span> Adicione produtos a sua lista de compras para separarmos seu estoque;\n              </p>\n              <p style="font-size:14px">\n                <span>3</span> Finalize o pedido e faça o pagamento;\n              </p>\n              <p style="font-size:14px">\n                <span>4</span> Receba os produtos em seu endereço;\n              </p>\n            </div>\n            <img src="assets/images/logo.png" style="width: 150px;"/>\n          </ion-col>\n          <ion-col col-12 class="btnContainer">\n            <ion-col col-6>\n              <button ion-button outline style="float:left;" (click)="goToSlideBefore()">\n                <p><ion-icon name="rewind"></ion-icon> Anterior</p>\n              </button>\n            </ion-col>\n            <ion-col col-6>\n              <button ion-button outline style="float:right;" (click)="skipTour()">\n                <p>Fechar</p>\n              </button>\n            </ion-col>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\tour\tour.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], TourPage);

//# sourceMappingURL=tour.js.map

/***/ }),

/***/ 191:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 191;

/***/ }),

/***/ 232:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 232;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__orders_orders__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__intro_intro__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__products_by_category_products_by_category__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_woocommerce_woocommerce__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MenuPage = (function () {
    function MenuPage(navCtrl, navParams, storage, modalCtrl, woocommerce) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.woocommerce = woocommerce;
        this.homePage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.categories = [];
        this.user = {};
        this.WooCommerce = this.woocommerce.initialize();
        this.WooCommerce.getAsync("products/categories").then(function (data) {
            console.log(JSON.parse(data.body).product_categories);
            var temp = JSON.parse(data.body).product_categories;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].parent == 0) {
                    _this.categories.push(temp[i]);
                }
            }
        }, function (err) {
            console.log(err);
        });
    }
    MenuPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    _this.user = userLoginInfo.user;
                    _this.loggedin = true;
                }
                else {
                    _this.user = {};
                    _this.loggedin = false;
                }
            });
        });
    };
    MenuPage.prototype.OpenCategoryPage = function (category) {
        this.childNavCrtl.setRoot(__WEBPACK_IMPORTED_MODULE_8__products_by_category_products_by_category__["a" /* ProductsByCategoryPage */], { "category": category });
    };
    MenuPage.prototype.openPage = function (pageName) {
        var _this = this;
        if (pageName == "signup") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
        }
        else if (pageName == "login") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        }
        else if (pageName == "cart") {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* CartPage */]);
            modal.present();
        }
        else if (pageName == "logout") {
            this.storage.remove("userLoginInfo").then(function () {
                _this.user = {};
                _this.loggedin = false;
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__intro_intro__["a" /* IntroPage */]);
            });
        }
        else if (pageName == "orders") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__orders_orders__["a" /* OrdersPage */]);
        }
    };
    return MenuPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
], MenuPage.prototype, "childNavCrtl", void 0);
MenuPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-menu',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n\n  <ion-header>\n\n    <ion-toolbar>\n\n      <ion-title>Menu</ion-title>\n\n    </ion-toolbar>\n\n  </ion-header>\n\n\n\n  <ion-content>\n\n    <ion-card class="card-background-page">\n\n        <img src="./assets/images/logoWithBackground.png" />\n\n    </ion-card>\n\n    <ion-list>\n\n      <ion-item *ngFor="let category of categories" text-wrap (click)="OpenCategoryPage(category)" menuClose>\n\n        <ion-icon [name]="category.icon" item-left large></ion-icon>\n\n        <h2>{{category.name}}</h2>\n\n        <p>{{category.description}}</p>\n\n      </ion-item>\n\n      <ion-item-divider style="background-color: rgb(0, 51, 153);"><span style="color:yellow;font-weight: bold;">Minha Conta</span></ion-item-divider>\n\n      <!--<ion-item (click)="openPage(\'signup\')" menuClose *ngIf = "!loggedin">\n\n        <ion-icon name="md-clipboard" item-left large></ion-icon>\n\n        <h2>Sign Up</h2>\n\n        <p>For a new account</p>\n\n      </ion-item>-->\n\n      <ion-item (click)="openPage(\'login\')" menuClose *ngIf = "!loggedin">\n\n        <ion-icon name="log-in" item-left large></ion-icon>\n\n        <h2>Acessar conta</h2>\n\n        <p>Utilize o email e cnpj da empresa </p>\n\n      </ion-item>\n\n      <ion-item *ngIf = "loggedin" menuClose (click)="openPage(\'signup\')">\n\n        <ion-icon name="contact" item-left large></ion-icon>\n\n        <h2>{{(this.user.firstname == \'\') ? this.user.username : this.user.firstname || "" }}</h2>\n\n        <p>Seja bem vindo!</p>\n\n      </ion-item>\n\n      <ion-item (click)="openPage(\'orders\')" *ngIf = "loggedin" menuClose>\n\n        <ion-icon name="list" item-left large></ion-icon>\n\n        <h2>Pedidos</h2>\n\n        <p>Veja os pedidos realizados</p>\n\n      </ion-item>\n\n      <ion-item onclick="window.open(\'http://www.mobilestock.com.br\', \'_system\', \'location=yes\'); return false;" menuClose>\n\n        <ion-icon name="arrow-round-forward" item-left large></ion-icon>\n\n        <h2>Fale Conosco</h2>\n\n        <p>Deixe sua mensagem</p>\n\n      </ion-item>\n\n      <ion-item (click)="openPage(\'cart\')" *ngIf = "loggedin" menuClose>\n\n        <ion-icon name="cart" item-left large></ion-icon>\n\n        <h2>Lista de produtos</h2>\n\n        <p>Veja sua lista de produtos</p>\n\n      </ion-item>\n\n      <ion-item (click)="openPage(\'logout\')" *ngIf = "loggedin" menuClose>\n\n        <ion-icon name="log-out" item-left large></ion-icon>\n\n        <h2>Sair</h2>\n\n        <p>de sua conta</p>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav #content [root]="homePage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\menu\menu.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_9__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */]])
], MenuPage);

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__thank_thank__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CheckoutPage = (function () {
    function CheckoutPage(navCtrl, http, navParams, storage, alertCtrl, toastCtrl, woocommerce, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.woocommerce = woocommerce;
        this.loadingCtrl = loadingCtrl;
        this.totalQty = 0;
        this.subtotal = 0.00; //valor total da transação sem acresimo.
        this.total = 0.00; //controla o valor total da transação após acrescimo a prazo
        this.discount = 0.00;
        this.couponItems = [];
        this.value = 0.00;
        this.newOrder = {};
        this.newOrder.billing_address = {};
        this.newOrder.shipping_address = {};
        this.billing_shipping_same = false;
        this.paymentMethods = [
            { method_id: "bacs", method_title: "Depósito" },
            { method_id: "cheque", method_title: "A prazo" },
        ];
        this.WooCommerce = this.woocommerce.initialize();
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        this.loading.present();
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                _this.userInfo = userLoginInfo.user;
                var email = userLoginInfo.user.email;
                if (userLoginInfo != null) {
                    _this.http.get("http://mobilestock.com.br/wp-json/app/v1/cart?user=" + _this.userInfo.id).subscribe(function (data) {
                        var cart = data.json();
                        cart.forEach(function (element, index) {
                            var product = JSON.parse(element.product);
                            _this.totalQty = _this.totalQty + Number(element.qty);
                            _this.subtotal = _this.subtotal + (product.price * element.qty);
                            _this.total = 0;
                        });
                        _this.subtotal = parseFloat(_this.subtotal).toFixed(2);
                        // discount calc
                        if (_this.totalQty >= 120 && _this.totalQty <= 179) {
                            var value = 0.00;
                            value = _this.subtotal * 0.01;
                            value = parseFloat(value).toFixed(2);
                            _this.subtotal = _this.subtotal - value;
                            _this.subtotal = parseFloat(_this.subtotal).toFixed(2);
                            _this.couponItems.push({ "id": 173, "code": "desconto de 1%", "amount": _this.discount });
                        }
                        else if (_this.totalQty >= 180 && _this.totalQty <= 239) {
                            var value = 0.00;
                            value = _this.subtotal * 0.02;
                            _this.subtotal = _this.subtotal - value;
                            _this.subtotal = parseFloat(_this.subtotal).toFixed(2);
                            _this.couponItems.push({ "id": 175, "code": "desconto de 2%", "amount": _this.discount });
                        }
                        else if (_this.totalQty >= 240) {
                            _this.value = _this.subtotal * 0.025;
                            _this.subtotal = _this.subtotal - _this.value;
                            _this.subtotal = parseFloat(_this.subtotal).toFixed(2);
                            _this.couponItems.push({ "id": 176, "code": "desconto de 2,5%", "amount": _this.discount });
                        }
                    });
                    _this.WooCommerce.getAsync("customers/email/" + email).then(function (data) {
                        _this.loading.dismiss();
                        _this.newOrder = JSON.parse(data.body).customer;
                    });
                }
            });
        });
    }
    CheckoutPage.prototype.getDiscount = function () {
        this.total = 0.00;
        this.discount = 0.00;
        this.subtotal = Number.parseFloat(this.subtotal);
        if (this.paymentMethod == "bacs") {
            this.total = this.subtotal;
            this.total = parseFloat(this.total).toFixed(2);
        }
        else if (this.paymentMethod == "cheque") {
            this.value = this.subtotal * 0.1364;
            this.total = this.subtotal + this.value;
            this.discount = this.value - this.discount;
            this.discount = parseFloat(this.discount).toFixed(2);
            this.total = parseFloat(this.total).toFixed(2);
        }
    };
    CheckoutPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same) {
            this.newOrder.shipping_address = this.newOrder.billing_address;
        }
    };
    CheckoutPage.prototype.placeOrder = function () {
        var _this = this;
        var orderItems = [];
        var data = {};
        var paymentData = {};
        this.loading = this.loadingCtrl.create({
            content: 'Carregando...'
        });
        if (paymentData.method_id == "") {
            this.toastCtrl.create({
                message: "Metódo de pagamento não informado.",
                duration: 3000
            });
        }
        this.loading.present();
        this.paymentMethods.forEach(function (element, index) {
            if (element.method_id == _this.paymentMethod) {
                paymentData = element;
            }
        });
        data = {
            payment_details: {
                method_id: paymentData.method_id,
                method_title: paymentData.method_title,
                paid: true
            },
            billing_address: this.newOrder.billing_address,
            shipping_address: this.newOrder.shipping_address,
            customer_id: this.userInfo.id || '',
            line_items: orderItems,
            coupon_lines: this.couponItems
        };
        if (paymentData.method_id == "bacs" || paymentData.method_id == "cheque") {
            this.http.get("http://mobilestock.com.br/wp-json/app/v1/cart?user=" + this.userInfo.id).subscribe(function (res) {
                var cart = res.json();
                var perProductValue = _this.total / _this.totalQty;
                cart.forEach(function (element, index) {
                    var mainProduct = JSON.parse(element.mainProduct);
                    var qty = Number.parseInt(element.qty);
                    var totalProduct = qty * perProductValue;
                    orderItems.push({ product_id: mainProduct.id,
                        variation_id: element.productID,
                        quantity: qty,
                        subtotal: totalProduct,
                        total: totalProduct
                    });
                });
                data.line_items = orderItems;
                var orderData = {};
                orderData.order = data;
                _this.WooCommerce.postAsync("orders", orderData).then(function (data) {
                    var response = JSON.parse(data.body).order;
                    _this.loading.dismiss();
                    _this.alertCtrl.create({
                        title: "Ordem de pagamento enviada com sucesso",
                        message: "O número de identificação da sua ordem é: " + response.order_number,
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    _this.http.delete("http://mobilestock.com.br/wp-json/app/v1/cart?user=" + _this.userInfo.id).subscribe(function (data) {
                                        var res = data.json();
                                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__thank_thank__["a" /* ThankPage */]);
                                        if (res.error) {
                                            _this.toastCtrl.create({
                                                message: response.error,
                                                duration: 3000,
                                            }).present();
                                            return;
                                        }
                                    });
                                }
                            }]
                    }).present();
                });
            });
        }
        else {
            this.loading.dismiss();
            this.toastCtrl.create({
                message: "Metódo de pagamento não informado.",
                duration: 3000
            }).present();
        }
    };
    return CheckoutPage;
}());
CheckoutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-checkout',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\checkout\checkout.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Enviar lista de pedido</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-card>\n\n    <ion-list>\n\n      <ion-item-divider color="primary">Detalhes de pagamento</ion-item-divider>\n\n      <ion-item style="font-size:15px;">\n\n        Quantidade: {{totalQty}}\n\n      </ion-item>\n\n      <ion-item style="font-size:15px;">\n\n        Subtotal: R$ {{subtotal}}\n\n      </ion-item>\n\n      <ion-item style="font-size:15px;">\n\n        <ion-label>Método de pagamento</ion-label>\n\n        <ion-select [(ngModel)]="paymentMethod" (ionChange)="getDiscount()">\n\n          <ion-option *ngFor="let p of paymentMethods" value="{{p.method_id}}"> {{p.method_title}} </ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n      <ion-item style="font-size:15px;">\n\n        Total: R$ {{total}}\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-card>\n\n  <ion-card>\n\n    <ion-list>\n\n      <ion-item-divider color="primary">Informações pessoas</ion-item-divider>\n\n      <ion-item>\n\n        <ion-label>Nome</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newOrder.billing_address.first_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Sobrenome</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newOrder.billing_address.last_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Email</ion-label>\n\n        <ion-input readonly type="email" [(ngModel)]="newOrder.email"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Usuário</ion-label>\n\n        <ion-input readonly type="text" [(ngModel)]="newOrder.username"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item-divider color="primary">Detalhes de cobrança</ion-item-divider>\n\n\n\n      <ion-item>\n\n        <ion-label>Endereço linha 1</ion-label>\n\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing_address.address_1"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Endereço linha 2</ion-label>\n\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing_address.address_2"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>País</ion-label>\n\n        <ion-select [(ngModel)]="newOrder.billing_address.country">\n\n          <ion-option value="Brasil" selected="true">Brasil</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Estado</ion-label>\n\n        <ion-select [(ngModel)]="newOrder.billing_address.state">\n\n          <ion-option value="Acre">Acre</ion-option>\n\n          <ion-option value="Alagoas">Alagoas</ion-option>\n\n          <ion-option value="Amapá">Amapá</ion-option>\n\n          <ion-option value="Amazonas">Amazonas</ion-option>\n\n          <ion-option value="Bahia">Bahia</ion-option>\n\n          <ion-option value="Bahia">Bahia</ion-option>\n\n          <ion-option value="Distrito Federal">Distrito Federal</ion-option>\n\n          <ion-option value="Espírito Santo">Espírito Santo</ion-option>\n\n          <ion-option value="Goiás">Goiás</ion-option>\n\n          <ion-option value="Maranhão">Maranhão</ion-option>\n\n          <ion-option value="Mato Grosso">Mato Grosso</ion-option>\n\n          <ion-option value="Mato Grosso do Sul">Mato Grosso do Sul</ion-option>\n\n          <ion-option value="Minas Gerais">Minas Gerais</ion-option>\n\n          <ion-option value="Pará">Pará</ion-option>\n\n          <ion-option value="Paraíba">Paraíba</ion-option>\n\n          <ion-option value="Paraná">Paraná</ion-option>\n\n          <ion-option value="Pernambuco">Pernambuco</ion-option>\n\n          <ion-option value="Piauí">Piauí</ion-option>\n\n          <ion-option value="Rio de Janeiro">Rio de Janeiro</ion-option>\n\n          <ion-option value="Rio Grande do Norte">Rio Grande do Norte</ion-option>\n\n          <ion-option value="Rio Grande do Sul">Rio Grande do Sul</ion-option>\n\n          <ion-option value="Rondônia">Rondônia</ion-option>\n\n          <ion-option value="Roraima">Roraima</ion-option>\n\n          <ion-option value="Santa Catarina">Santa Catarina</ion-option>\n\n          <ion-option value="São Paulo">São Paulo</ion-option>\n\n          <ion-option value="Sergipe">Sergipe</ion-option>\n\n          <ion-option value="Tocantins">Tocantins</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Cidade</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newOrder.billing_address.city"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>CEP</ion-label>\n\n        <ion-input type="number" clearInput [(ngModel)]="newOrder.billing_address.postcode"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Telefone</ion-label>\n\n        <ion-input type="tel" clearInput [(ngModel)]="newOrder.billing_address.phone"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item>\n\n        <ion-label>Utilizar detalhes de cobrança? </ion-label>\n\n        <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n\n      </ion-item>\n\n      <ion-item-divider color="primary" *ngIf="!billing_shipping_same">Detalhes de entrega</ion-item-divider>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Nome</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newOrder.shipping_address.first_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Sobrenome</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newOrder.shipping_address.last_name"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Endereço linha 1</ion-label>\n\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping_address.address_1"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Endereço linha 2</ion-label>\n\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping_address.address_2"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>País</ion-label>\n\n        <ion-select [(ngModel)]="newOrder.shipping_address.country">\n\n          <ion-option value="Brasil" selected="true">Brasil</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Estado</ion-label>\n\n        <ion-select [(ngModel)]="newOrder.shipping_address.state">\n\n          <ion-option value="Acre">Acre</ion-option>\n\n          <ion-option value="Alagoas">Alagoas</ion-option>\n\n          <ion-option value="Amapá">Amapá</ion-option>\n\n          <ion-option value="Amazonas">Amazonas</ion-option>\n\n          <ion-option value="Bahia">Bahia</ion-option>\n\n          <ion-option value="Bahia">Bahia</ion-option>\n\n          <ion-option value="Distrito Federal">Distrito Federal</ion-option>\n\n          <ion-option value="Espírito Santo">Espírito Santo</ion-option>\n\n          <ion-option value="Goiás">Goiás</ion-option>\n\n          <ion-option value="Maranhão">Maranhão</ion-option>\n\n          <ion-option value="Mato Grosso">Mato Grosso</ion-option>\n\n          <ion-option value="Mato Grosso do Sul">Mato Grosso do Sul</ion-option>\n\n          <ion-option value="Minas Gerais">Minas Gerais</ion-option>\n\n          <ion-option value="Pará">Pará</ion-option>\n\n          <ion-option value="Paraíba">Paraíba</ion-option>\n\n          <ion-option value="Paraná">Paraná</ion-option>\n\n          <ion-option value="Pernambuco">Pernambuco</ion-option>\n\n          <ion-option value="Piauí">Piauí</ion-option>\n\n          <ion-option value="Rio de Janeiro">Rio de Janeiro</ion-option>\n\n          <ion-option value="Rio Grande do Norte">Rio Grande do Norte</ion-option>\n\n          <ion-option value="Rio Grande do Sul">Rio Grande do Sul</ion-option>\n\n          <ion-option value="Rondônia">Rondônia</ion-option>\n\n          <ion-option value="Roraima">Roraima</ion-option>\n\n          <ion-option value="Santa Catarina">Santa Catarina</ion-option>\n\n          <ion-option value="São Paulo">São Paulo</ion-option>\n\n          <ion-option value="Sergipe">Sergipe</ion-option>\n\n          <ion-option value="Tocantins">Tocantins</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Cidade</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newOrder.shipping_address.city"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>CEP</ion-label>\n\n        <ion-input type="number" clearInput [(ngModel)]="newOrder.shipping_address.postcode"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Telefone</ion-label>\n\n        <ion-input type="tel" clearInput [(ngModel)]="newOrder.shipping_address.phone"></ion-input>\n\n      </ion-item>\n\n    </ion-list>\n\n  </ion-card>\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <button ion-button block color="primary" (click)="placeOrder()">Enviar pedido</button>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\checkout\checkout.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], CheckoutPage);

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ThankPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ThankPage = (function () {
    function ThankPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.message = "Obrigado por realizar seu pedido.\n                    Em at\u00E9 24 horas entraremos em contato para confirmar as informa\u00E7\u00F5es.";
    }
    ThankPage.prototype.closeModal = function () {
        this.navCtrl.popAll();
    };
    return ThankPage;
}());
ThankPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-thank',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\thank\thank.html"*/'<ion-content class="body">\n  <ion-grid class="gridIntro">\n    <ion-row>\n        <img class="imgIntro" src="assets/images/logoWithBackground.png" />\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-12 offset-lg-12>\n        <p class="paragraph">{{message}}</p>\n      </ion-col>\n    </ion-row>\n   </ion-grid>\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button color="primary" outline block (click) = "closeModal()">Sair</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\thank\thank.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], ThankPage);

//# sourceMappingURL=thank.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WooCommerceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_woocommerce_api__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WooCommerceProvider = (function () {
    function WooCommerceProvider() {
        this.WooCommerce = __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__({
            url: "http://mobilestock.com.br/",
            consumerKey: "ck_e33d2196255b5ada7bf637d785afbfca5be0b78d ",
            consumerSecret: "cs_34cc36be2864d9cfe66d1471db5d0cdeb50ccc7e"
        });
    }
    WooCommerceProvider.prototype.initialize = function () {
        return this.WooCommerce;
    };
    return WooCommerceProvider;
}());
WooCommerceProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], WooCommerceProvider);

//# sourceMappingURL=woocommerce.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__product_details_product_details__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, woocommerce, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.woocommerce = woocommerce;
        this.loadingCtrl = loadingCtrl;
        this.search = "";
        this.products = [];
        this.page = 2;
        this.search = this.navParams.get("search");
        this.WooCommerce = this.woocommerce.initialize();
        this.loading = this.loadingCtrl.create({
            content: 'Buscando...'
        });
        this.loading.present();
        this.WooCommerce.getAsync("products?filter[q]=" + this.search).then(function (searchData) {
            _this.products = JSON.parse(searchData.body).products;
            _this.loading.dismiss();
        });
    }
    SearchPage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.WooCommerce.getAsync("products?filter[q]=" + this.search + "&page=" + this.page).then(function (searchData) {
            _this.products = _this.products.concat(JSON.parse(searchData.body).products);
            if (JSON.parse(searchData.body).products.length < 10) {
                event.enable(false);
            }
            event.complete();
            _this.page++;
        });
    };
    SearchPage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
    };
    return SearchPage;
}());
SearchPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-search',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\search\search.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Busca: {{search}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content class="body" no-padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 col-sm *ngFor="let product of products" text-wrap (click) = "openProductPage(product)">\n        <ion-card no-padding>\n          <img [src]="product.featured_src"/>\n          <h3 style="padding: 10px;font-size: 15px;font-weight:bold;text-align:center;">{{product.title}}</h3>\n          <p style="padding: 10px; text-align: center; font-size: 12px;" [innerHtml] = "product.price_html"></p>\n          <p>\n            <span *ngIf="product.average_rating >= 1">\n              <ion-icon style="color:#d4af37;" small name="star"></ion-icon>\n            </span>\n            <span *ngIf="product.average_rating >= 2">\n              <ion-icon style="color:#d4af37;" small name="star"></ion-icon>\n            </span>\n            <span *ngIf="product.average_rating >= 3">\n              <ion-icon style="color:#d4af37;" small name="star"></ion-icon>\n            </span>\n            <span *ngIf="product.average_rating >= 4">\n              <ion-icon style="color:#d4af37;" small name="star"></ion-icon>\n            </span>\n            <span *ngIf="product.average_rating >= 5">\n              <ion-icon style="color:#d4af37;" small name="star"></ion-icon>\n            </span>\n          </p>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 col-sm *ngFor="let product of moreProducts" text-wrap (click) = "openProductPage(product)">\n        <ion-card no-padding>\n          <img [src]="product.featured_src"/>\n          <h3 style="padding: 10px;font-size: 15px;font-weight:bold;text-align:center;">{{product.title}}</h3>\n          <p style="padding: 10px; text-align: center; font-size: 12px;" [innerHtml] = "product.price_html"></p>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <ion-infinite-scroll (ionInfinite) = "loadMoreProducts($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\search\search.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], SearchPage);

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, loadingCtrl, storage, toastCtrl, alertCtrl, woocommerce) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.woocommerce = woocommerce;
        this.newUser = {};
        this.newUser.billing_address = {};
        this.newUser.shipping_address = {};
        this.billing_shipping_same = false;
        this.WooCommerce = this.woocommerce.initialize();
        this.loading = this.loadingCtrl.create({
            content: 'Carregando dados...'
        });
        this.loading.present();
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    _this.userInfo = userLoginInfo.user;
                    //console.log(this.userInfo);
                    var email = userLoginInfo.user.email;
                    _this.WooCommerce.getAsync("customers/email/" + email).then(function (data) {
                        _this.newUser = JSON.parse(data.body).customer;
                    });
                    _this.loading.dismiss();
                    _this.editing = true;
                }
                else {
                    _this.loading.dismiss();
                    _this.editing = false;
                }
            });
        });
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad Signup');
    };
    SignupPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
    };
    SignupPage.prototype.checkEmail = function () {
        var _this = this;
        var validEmail = false;
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(this.newUser.email)) {
            //email looks valid
            this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then(function (data) {
                var res = (JSON.parse(data.body));
                if (res.errors) {
                    validEmail = true;
                    _this.toastCtrl.create({
                        message: "Ótimo. Email válido.",
                        duration: 3000
                    }).present();
                }
                else {
                    if (_this.editing == false) {
                        validEmail = false;
                        _this.toastCtrl.create({
                            message: "Email já registrado. Favor verificar.",
                            showCloseButton: true
                        }).present();
                    }
                }
                console.log(validEmail);
            });
        }
        else {
            validEmail = false;
            this.toastCtrl.create({
                message: "Email inválido. Favor verificar.",
                showCloseButton: true
            }).present();
            console.log(validEmail);
        }
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        var customerData = {
            customer: {}
        };
        customerData.customer = {
            "email": this.newUser.email,
            "first_name": this.newUser.first_name,
            "last_name": this.newUser.last_name,
            "username": this.newUser.username,
            "password": this.newUser.password,
            "billing_address": {
                "first_name": this.newUser.first_name,
                "last_name": this.newUser.last_name,
                "company": "",
                "address_1": this.newUser.billing_address.address_1,
                "address_2": this.newUser.billing_address.address_2,
                "city": this.newUser.billing_address.city,
                "state": this.newUser.billing_address.state,
                "postcode": this.newUser.billing_address.postcode,
                "country": this.newUser.billing_address.country,
                "email": this.newUser.email,
                "phone": this.newUser.billing_address.phone
            },
            "shipping_address": {
                "first_name": this.newUser.first_name,
                "last_name": this.newUser.last_name,
                "company": "",
                "address_1": this.newUser.shipping_address.address_1,
                "address_2": this.newUser.shipping_address.address_2,
                "city": this.newUser.shipping_address.city,
                "state": this.newUser.shipping_address.state,
                "postcode": this.newUser.shipping_address.postcode,
                "country": this.newUser.shipping_address.country
            }
        };
        if (this.billing_shipping_same) {
            this.newUser.shipping_address = this.newUser.shipping_address;
        }
        if (!this.editing) {
            this.WooCommerce.postAsync('customers', customerData).then(function (data) {
                var response = (JSON.parse(data.body));
                if (response.customer) {
                    _this.alertCtrl.create({
                        title: "Conta criada",
                        message: "Sua conta foi criada com sucesso! Favor realizar login para seguir.",
                        buttons: [{
                                text: "Login",
                                handler: function () {
                                    //TODO
                                }
                            }]
                    }).present();
                }
                else if (response.errors) {
                    _this.toastCtrl.create({
                        message: response.errors[0].message,
                        showCloseButton: true
                    }).present();
                }
            });
        }
        else {
            this.WooCommerce.putAsync('customers/' + this.userInfo.id, customerData).then(function (data) {
                var response = (JSON.parse(data.body));
                if (response.customer) {
                    _this.alertCtrl.create({
                        title: "Conta atualizada",
                        message: "Sua conta foi atualizada com sucesso!",
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    //TODO
                                }
                            }]
                    }).present();
                }
                else if (response.errors) {
                    _this.toastCtrl.create({
                        message: response.errors[0].message,
                        showCloseButton: true
                    }).present();
                }
            });
        }
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-signup',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\signup\signup.html"*/'<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Dados do cliente</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item-divider color="primary">Detalhes pessoais</ion-item-divider>\n\n\n\n    <ion-item>\n\n      <ion-label>Nome</ion-label>\n\n      <ion-input type="text" [(ngModel)]="newUser.first_name"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Sobrenome</ion-label>\n\n      <ion-input type="text" [(ngModel)]="newUser.last_name"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Email</ion-label>\n\n      <ion-input type="email" [(ngModel)]="newUser.email" (ionBlur)="checkEmail()"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Usuário</ion-label>\n\n      <ion-input type="text" [(ngModel)]="newUser.username"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Senha</ion-label>\n\n      <ion-input type="password" [(ngModel)]="newUser.password"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label>Confirmar senha</ion-label>\n\n      <ion-input type="password" [(ngModel)]="newUser.confirm_password"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item-divider color="primary">Billing Details</ion-item-divider>\n\n\n\n    <ion-item>\n\n      <ion-label>Endereço linha 1</ion-label>\n\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address_1"></ion-textarea>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Endereço linha 2</ion-label>\n\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address_2"></ion-textarea>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>País</ion-label>\n\n      <ion-select [(ngModel)]="newUser.billing_address.country">\n\n        <ion-option value="Brasil" selected="true">Brasil</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Estado</ion-label>\n\n      <ion-select [(ngModel)]="newUser.billing_address.state">\n\n        <ion-option value="Acre">Acre</ion-option>\n\n        <ion-option value="Alagoas">Alagoas</ion-option>\n\n        <ion-option value="Amapá">Amapá</ion-option>\n\n        <ion-option value="Amazonas">Amazonas</ion-option>\n\n        <ion-option value="Bahia">Bahia</ion-option>\n\n        <ion-option value="Bahia">Bahia</ion-option>\n\n        <ion-option value="Distrito Federal">Distrito Federal</ion-option>\n\n        <ion-option value="Espírito Santo">Espírito Santo</ion-option>\n\n        <ion-option value="Goiás">Goiás</ion-option>\n\n        <ion-option value="Maranhão">Maranhão</ion-option>\n\n        <ion-option value="Mato Grosso">Mato Grosso</ion-option>\n\n        <ion-option value="Mato Grosso do Sul">Mato Grosso do Sul</ion-option>\n\n        <ion-option value="Minas Gerais">Minas Gerais</ion-option>\n\n        <ion-option value="Pará">Pará</ion-option>\n\n        <ion-option value="Paraíba">Paraíba</ion-option>\n\n        <ion-option value="Paraná">Paraná</ion-option>\n\n        <ion-option value="Pernambuco">Pernambuco</ion-option>\n\n        <ion-option value="Piauí">Piauí</ion-option>\n\n        <ion-option value="Rio de Janeiro">Rio de Janeiro</ion-option>\n\n        <ion-option value="Rio Grande do Norte">Rio Grande do Norte</ion-option>\n\n        <ion-option value="Rio Grande do Sul">Rio Grande do Sul</ion-option>\n\n        <ion-option value="Rondônia">Rondônia</ion-option>\n\n        <ion-option value="Roraima">Roraima</ion-option>\n\n        <ion-option value="Santa Catarina">Santa Catarina</ion-option>\n\n        <ion-option value="São Paulo">São Paulo</ion-option>\n\n        <ion-option value="Sergipe">Sergipe</ion-option>\n\n        <ion-option value="Tocantins">Tocantins</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Cidade</ion-label>\n\n      <ion-input type="text" [(ngModel)]="newUser.billing_address.city"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>CEP</ion-label>\n\n      <ion-input type="number" clearInput [(ngModel)]="newUser.billing_address.postcode"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Telefone</ion-label>\n\n      <ion-input type="tel" clearInput [(ngModel)]="newUser.billing_address.phone"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label>Utilizar detalhes de cobrança?</ion-label>\n\n      <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n\n    </ion-item>\n\n\n\n\n\n    <ion-item-divider color="primary" *ngIf="!billing_shipping_same">Shipping Details</ion-item-divider>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Endereço linha 1</ion-label>\n\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address_1"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Endereço linha 2</ion-label>\n\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address_2"></ion-textarea>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>País</ion-label>\n\n        <ion-select [(ngModel)]="newUser.shipping_address.country">\n\n          <ion-option value="Brasil" selected="true">Brasil</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Estado</ion-label>\n\n        <ion-select [(ngModel)]="newUser.shipping_address.state">\n\n          <ion-option value="Acre">Acre</ion-option>\n\n          <ion-option value="Alagoas">Alagoas</ion-option>\n\n          <ion-option value="Amapá">Amapá</ion-option>\n\n          <ion-option value="Amazonas">Amazonas</ion-option>\n\n          <ion-option value="Bahia">Bahia</ion-option>\n\n          <ion-option value="Bahia">Bahia</ion-option>\n\n          <ion-option value="Distrito Federal">Distrito Federal</ion-option>\n\n          <ion-option value="Espírito Santo">Espírito Santo</ion-option>\n\n          <ion-option value="Goiás">Goiás</ion-option>\n\n          <ion-option value="Maranhão">Maranhão</ion-option>\n\n          <ion-option value="Mato Grosso">Mato Grosso</ion-option>\n\n          <ion-option value="Mato Grosso do Sul">Mato Grosso do Sul</ion-option>\n\n          <ion-option value="Minas Gerais">Minas Gerais</ion-option>\n\n          <ion-option value="Pará">Pará</ion-option>\n\n          <ion-option value="Paraíba">Paraíba</ion-option>\n\n          <ion-option value="Paraná">Paraná</ion-option>\n\n          <ion-option value="Pernambuco">Pernambuco</ion-option>\n\n          <ion-option value="Piauí">Piauí</ion-option>\n\n          <ion-option value="Rio de Janeiro">Rio de Janeiro</ion-option>\n\n          <ion-option value="Rio Grande do Norte">Rio Grande do Norte</ion-option>\n\n          <ion-option value="Rio Grande do Sul">Rio Grande do Sul</ion-option>\n\n          <ion-option value="Rondônia">Rondônia</ion-option>\n\n          <ion-option value="Roraima">Roraima</ion-option>\n\n          <ion-option value="Santa Catarina">Santa Catarina</ion-option>\n\n          <ion-option value="São Paulo">São Paulo</ion-option>\n\n          <ion-option value="Sergipe">Sergipe</ion-option>\n\n          <ion-option value="Tocantins">Tocantins</ion-option>\n\n        </ion-select>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Cidade</ion-label>\n\n        <ion-input type="text" [(ngModel)]="newUser.shipping_address.city"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>CEP</ion-label>\n\n        <ion-input type="number" clearInput [(ngModel)]="newUser.shipping_address.postcode"></ion-input>\n\n      </ion-item>\n\n\n\n      <ion-item *ngIf="!billing_shipping_same">\n\n        <ion-label>Telefone</ion-label>\n\n        <ion-input type="tel" clearInput [(ngModel)]="newUser.shipping_address.phone"></ion-input>\n\n      </ion-item>\n\n\n\n  </ion-list>\n\n</ion-content>\n\n\n\n<ion-footer>\n\n  <button ion-button block color="primary" (click)="signup()">Salvar dados </button>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\signup\signup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_details_order_details__ = __webpack_require__(338);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrdersPage = (function () {
    function OrdersPage(navCtrl, navParams, toastCtrl, loadingCtrl, woocommerce, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.woocommerce = woocommerce;
        this.storage = storage;
        this.page = 1;
        this.WooCommerce = this.woocommerce.initialize();
        this.loadingCtrl.create({
            content: 'Carregando...',
            duration: 4000
        }).present();
        this.storage.get("userLoginInfo").then(function (data) {
            _this.customerId = data.user.id;
        });
        this.WooCommerce.getAsync("orders?filter[customer]=" + this.customerId).then(function (data) {
            _this.orders = JSON.parse(data.body).orders;
            console.log(_this.orders);
        }, function (err) {
            console.log(err);
        });
    }
    OrdersPage.prototype.ionViewDidLoad = function () {
    };
    OrdersPage.prototype.loadMoreOrders = function (event) {
        var _this = this;
        this.page++;
        this.WooCommerce.getAsync("orders?filter[customer]=" + this.customerId + "&page=" + this.page).then(function (data) {
            var temp = JSON.parse(data.body).orders;
            _this.orders = _this.orders.concat(JSON.parse(data.body).orders);
            //console.log(this.products);
            event.complete();
            if (temp.length < 10) {
                event.enable(false);
                _this.toastCtrl.create({
                    message: "Não existem mais pedidos!",
                    duration: 3000
                }).present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    OrdersPage.prototype.openOrderPage = function (order) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__order_details_order_details__["a" /* OrderDetailsPage */], { "order": order });
    };
    return OrdersPage;
}());
OrdersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-orders',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\orders\orders.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button color="danger" ion-button icon menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Pedidos</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content no-padding>\n  <ion-list>\n    <ion-item *ngFor="let order of orders" text-wrap (click) = "openOrderPage(order)">\n      <h2>Pedido: {{order.id}}</h2>\n      <p>\n        <span><b>Data:</b> {{order.created_at}}</span><br/>\n        <span><b>Status:</b> {{order.status}} </span><br/>\n        <span><b>Total:</b> R$ {{order.total}} de {{order.total_line_items_quantity}} itens</span>\n      </p>\n      <button ion-button icon clear item-right>\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite) = "loadMoreOrders($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\orders\orders.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
], OrdersPage);

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var OrderDetailsPage = (function () {
    function OrderDetailsPage(navCtrl, navParams, woocommerce) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.woocommerce = woocommerce;
        this.order = this.navParams.get("order");
        this.WooCommerce = this.woocommerce.initialize();
    }
    OrderDetailsPage.prototype.ionViewDidLoad = function () {
    };
    return OrderDetailsPage;
}());
OrderDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-order-details',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\order-details\order-details.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Pedido: {{order.id}}</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-item-group>\n    <ion-item-divider color="default">Detalhes do pedido</ion-item-divider>\n    <ion-list>\n      <ion-item *ngFor="let item of order.line_items">\n        <h2>{{item.name}}</h2>\n        <p><b>Quantidade:</b> {{item.quantity}}</p>\n        <p><b>Valor:</b> R$ {{item.total}}</p>\n      </ion-item>\n      <ion-item><b>Subtotal:</b> R$ {{order.subtotal}}</ion-item>\n      <ion-item><b>Desconto:</b> R$ {{order.total_discount}}</ion-item>\n      <ion-item><b>Método de pagamento:</b> {{order.payment_details.method_title}}</ion-item>\n      <ion-item><b>Total:</b> R$ {{order.total}}</ion-item>\n    </ion-list>\n  </ion-item-group>\n  <ion-item-group>\n      <ion-item-divider color="light">Dados do cliente</ion-item-divider>\n      <ion-item><b>E-mail:</b> {{order.customer.email}}</ion-item>\n      <ion-item><b>Telefone:</b> {{order.customer.billing_address.phone}}</ion-item>\n    </ion-item-group>\n    <ion-item-group>\n      <ion-item-divider color="light">Endereço de cobrança</ion-item-divider>\n      <ion-item><i>{{order.billing_address.address_1}} {{order.billing_address.address_2}}<br/>\n                   {{order.billing_address.city}}/ {{order.billing_address.state}}<br/>\n                   CEP: {{order.billing_address.postcode}}\n                </i></ion-item>\n\n      <ion-item-divider color="light">Endereço de entrega</ion-item-divider>\n      <ion-item><i>{{order.shipping_address.address_1}} {{order.shipping_address.address_2}}<br/>\n                   {{order.shipping_address.city}}/ {{order.shipping_address.state}}<br/>\n                   CEP: {{order.shipping_address.postcode}}\n                </i></ion-item>\n    </ion-item-group>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\order-details\order-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */]])
], OrderDetailsPage);

//# sourceMappingURL=order-details.js.map

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsByCategoryPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductsByCategoryPage = (function () {
    function ProductsByCategoryPage(navCtrl, navParams, toastCtrl, woocommerce, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.woocommerce = woocommerce;
        this.loadingCtrl = loadingCtrl;
        this.page = 1;
        this.category = this.navParams.get("category");
        this.WooCommerce = this.woocommerce.initialize();
        this.loadingCtrl.create({
            content: 'Carregando...',
            duration: 4000
        }).present();
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then(function (data) {
            //console.log(JSON.parse(data.body));
            _this.products = JSON.parse(data.body).products;
        }, function (err) {
            console.log(err);
        });
    }
    ProductsByCategoryPage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.page++;
        //console.log("Getting page" + this.page);
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then(function (data) {
            var temp = JSON.parse(data.body).products;
            _this.products = _this.products.concat(JSON.parse(data.body).products);
            //console.log(this.products);
            event.complete();
            if (temp.length < 10) {
                event.enable(false);
                _this.toastCtrl.create({
                    message: "Não existem mais produtos!",
                    duration: 5000
                }).present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    ProductsByCategoryPage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetailsPage */], { "product": product });
    };
    return ProductsByCategoryPage;
}());
ProductsByCategoryPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-products-by-category',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\products-by-category\products-by-category.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-buttons start>\n\n      <button color="danger" ion-button icon menuToggle>\n\n        <ion-icon name="menu"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>Produto por categoria</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding>\n\n  <ion-list>\n\n    <ion-item *ngFor="let product of products" text-wrap (click) = "openProductPage(product)">\n\n      <ion-thumbnail item-left>\n\n        <img [src]="product.featured_src"/>\n\n      </ion-thumbnail>\n\n      <h2>{{product.title}}</h2>\n\n      <p>\n\n        <span [innerHTML]="product.short_description.substr(0,50) + \'...\'"></span>\n\n        <span [innerHTML]="product.price_html"></span>\n\n      </p>\n\n      <button ion-button icon clear item-right>\n\n        <ion-icon name="arrow-forward"></ion-icon>\n\n      </button>\n\n    </ion-item>\n\n  </ion-list>\n\n  <ion-infinite-scroll (ionInfinite) = "loadMoreProducts($event)">\n\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\products-by-category\products-by-category.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], ProductsByCategoryPage);

//# sourceMappingURL=products-by-category.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(360);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_order_details_order_details__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_search_search__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_tour_tour__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_intro_intro__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_thank_thank__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_paypal__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_onesignal__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_woocommerce_woocommerce__ = __webpack_require__(31);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__["a" /* ProductsByCategoryPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__["a" /* ProductDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__["a" /* OrdersPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_order_details_order_details__["a" /* OrderDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tour_tour__["a" /* TourPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_intro_intro__["a" /* IntroPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_thank_thank__["a" /* ThankPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_22__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_20__angular_http__["b" /* HttpModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__["a" /* MenuPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__["a" /* ProductsByCategoryPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__["a" /* ProductDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* CheckoutPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_orders_orders__["a" /* OrdersPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_order_details_order_details__["a" /* OrderDetailsPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_tour_tour__["a" /* TourPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_intro_intro__["a" /* IntroPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_thank_thank__["a" /* ThankPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_18__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_19__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_21__ionic_native_paypal__["a" /* PayPal */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_24__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */],
            __WEBPACK_IMPORTED_MODULE_23__ionic_native_onesignal__["a" /* OneSignal */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_intro_intro__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__ = __webpack_require__(340);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, oneSignal) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.oneSignal = oneSignal;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_intro_intro__["a" /* IntroPage */];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit('0aa965b2-ee29-4d40-8bfc-e55abaee1597', '848609388484');
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            this.oneSignal.handleNotificationReceived().subscribe(function () {
                // do something when notification is received
            });
            this.oneSignal.handleNotificationOpened().subscribe(function () {
                // do something when a notification is opened
            });
            this.oneSignal.endInit();
        }
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\app\app.html"*/'<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_onesignal__["a" /* OneSignal */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 427:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 461:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 462:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 530:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntroPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tour_tour__ = __webpack_require__(183);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IntroPage = (function () {
    function IntroPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    IntroPage.prototype.ionViewDidLoad = function () {
    };
    IntroPage.prototype.openPage = function (pageName) {
        if (pageName == "tour") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tour_tour__["a" /* TourPage */]);
        }
        else if (pageName == "login") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
        }
    };
    return IntroPage;
}());
IntroPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-intro',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\intro\intro.html"*/'<ion-content class="body">\n  <ion-grid class="gridIntro">\n    <ion-row>\n        <img class="imgIntro" src="assets/images/logoWithBackground.png" />\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-12 offset-lg-12>\n        <p class="paragraph">Bem vindo a Mobile Stock,<br/> seu novo estoque virtual.</p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-12 offset-lg-12>\n        <button ion-button large outline icon-start class="btnIntro" (click)="openPage(\'login\')" style="padding-left:40px; padding-right:40px;">\n          <ion-icon name="person"></ion-icon>Fazer Login\n        </button>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-12 offset-lg-12>\n        <button ion-button large outline icon-start class="btnIntro" (click)="openPage(\'tour\')">\n          <ion-icon name="cog"></ion-icon>Como Funciona\n        </button>\n      </ion-col>\n    </ion-row>\n   </ion-grid>\n</ion-content>\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\intro\intro.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
], IntroPage);

//# sourceMappingURL=intro.js.map

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_woocommerce_woocommerce__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__home_home__ = __webpack_require__(163);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProductDetailsPage = (function () {
    function ProductDetailsPage(navCtrl, navParams, http, storage, toastCtrl, woocommerce, modalCtrl, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.woocommerce = woocommerce;
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.reviews = [];
        this.variations = [];
        this.list = [];
        this.showPrice = true;
        this.qtdStock = [];
        this.hide = true;
        this.form = [];
        this.sentVariation = [];
        this.goodTogo = false;
        this.variations = [];
        this.product = [];
        this.list = [];
        this.form = [];
        this.product = this.navParams.get("product");
        this.product.variations.forEach(function (item) {
            if (item.stock_quantity > 0) {
                _this.list.push(item);
                _this.variations.push(item);
            }
        });
        this.WooCommerce = this.woocommerce.initialize();
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    _this.user = userLoginInfo.user;
                }
            });
        });
    }
    ProductDetailsPage.prototype.ionViewWillLeave = function () {
        if (this.goodTogo) {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__home_home__["a" /* HomePage */]); //mantem page sempre refreshed.
        }
    };
    ProductDetailsPage.prototype.hidePrice = function (item) {
        this.showPrice = item;
    };
    ProductDetailsPage.prototype.addToCart = function (items) {
        var _this = this;
        this.goodTogo = true;
        this.cartItems = [];
        var stockAvaiable = false;
        this.loading = this.loadingCtrl.create({
            content: 'Adicionando item à lista de pedidos...'
        });
        this.loading.present();
        //reload products variations and push it in an array
        this.WooCommerce.getAsync('products/' + this.product.id).then(function (prod) {
            _this.product = [];
            _this.variations = [];
            _this.list = [];
            _this.product = JSON.parse(prod.body).product;
            _this.product.variations.forEach(function (item) {
                if (item.stock_quantity > 0) {
                    _this.list.push(item);
                    _this.variations.push(item);
                }
            });
            var counter = _this.variations.length;
            for (var item in items.value) {
                //check if quantity is empty
                if (items.value[item] != null && items.value[item] > 0) {
                    //verify stock quantity for each product variation
                    for (var v = 0; v < counter; v++) {
                        //verify if item match variation
                        if (_this.variations[v].id == item) {
                            //verify if stock quantity greater than item quantity
                            if (_this.variations[v].stock_quantity >= items.value[item]) {
                                stockAvaiable = true;
                            }
                            else {
                                _this.loading.dismiss();
                                _this.toastCtrl.create({
                                    message: "Quantidade de produto superior ao estoque.",
                                    duration: 3000,
                                }).present();
                                return;
                            }
                            if (stockAvaiable) {
                                _this.cartItems.push({
                                    "product": JSON.stringify(_this.variations[v]),
                                    "productID": _this.variations[v].id,
                                    "mainProduct": JSON.stringify(_this.product),
                                    "title": _this.product.title,
                                    "qty": Number(items.value[item]),
                                    "amount": parseFloat(_this.variations[v].price) * items.value[item],
                                    "featured_src": _this.product.featured_src,
                                    "iduser": _this.user.id
                                });
                                _this.variations[v].stock_quantity = _this.variations[v].stock_quantity - items.value[item];
                                var d = {
                                    product: {}
                                };
                                d.product = {
                                    "stock_quantity": _this.variations[v].stock_quantity
                                };
                                _this.WooCommerce.put('products/' + _this.variations[v].id, d, function (err, data, res) { });
                            }
                        }
                        //retira itens do carrinho com stockZero
                        if (_this.variations[v].stock_quantity == 0) {
                            _this.list.splice(v, 1);
                        }
                    }
                }
            }
            _this.http.get("http://mobilestock.com.br/wp-json/app/v1/cart?user=" + _this.user.id).subscribe(function (res) {
                var data = res.json();
                if (data == null || data.length == 0) {
                    data = [];
                    _this.cartItems.forEach(function (item) { return data.push(item); });
                }
                else {
                    _this.cartItems.forEach(function (item, index) {
                        var qty = 0;
                        var added = 0;
                        var dataProd;
                        var product;
                        data.forEach(function (element, i) {
                            product = JSON.parse(element.product);
                            if (product.id === item.productID) {
                                console.log("Produto já existe na lista de pedidos");
                                qty = Number(data[i].qty);
                                data[i].qty = qty + Number(item.qty);
                                dataProd = JSON.parse(data[i].product);
                                data[i].amount = parseFloat(data[i].amount) + (parseFloat(dataProd.price) * (item.qty));
                                added = 1;
                            }
                        });
                        if (added === 0) {
                            console.log("Produto novo");
                            data.push(_this.cartItems[index]);
                            added = 1;
                        }
                    });
                }
                _this.http.post("http://mobilestock.com.br/wp-json/app/v1/cart", data)
                    .subscribe(function (res) {
                    var response = res.json();
                    if (response.error) {
                        _this.toastCtrl.create({
                            message: response.error,
                            duration: 3000,
                        }).present();
                        return;
                    }
                    else {
                        _this.toastCtrl.create({
                            message: "Lista atualizada",
                            duration: 3000,
                        }).present();
                        _this.loading.dismiss();
                    }
                });
            }, function (err) { console.log(err); });
        });
    };
    ProductDetailsPage.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* CartPage */]).present();
    };
    return ProductDetailsPage;
}());
ProductDetailsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-product-details',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\product-details\product-details.html"*/'<ion-header>\n\n  <ion-navbar color="primary">\n\n    <ion-title>{{product.title}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="body">\n\n  <ion-fab right top edge (click)="openCart()">\n\n    <button ion-fab color="light"><ion-icon name="cart" style="color:black;"></ion-icon></button>\n\n  </ion-fab>\n\n  <ion-card>\n\n    <ion-slides autoplay="3000">\n\n      <ion-slide *ngFor="let image of product.images">\n\n        <img [src]="image.src" />\n\n      </ion-slide>\n\n    </ion-slides>\n\n    <ion-card-content>\n\n        <ion-card-title>\n\n          {{ product.title }} &nbsp;\n\n          <ion-chip *ngFor="let cat of product.categories" style="margin-left:5px;">\n\n            <ion-label color="primary"> {{ cat }}</ion-label>\n\n          </ion-chip>\n\n        </ion-card-title>\n\n        <div class="descricao" [innerHTML] = "product.description"></div>\n\n      </ion-card-content>\n\n  </ion-card>\n\n  <form #form="ngForm">\n\n    <ion-card *ngFor="let variation of list; let i = index">\n\n      <ion-card-content no-padding>\n\n        <ion-list>\n\n          <ion-item style="font-size:18px;">\n\n            <p>Numeração: {{variation.attributes["0"].option}}</p>\n\n            <p>Estoque Disponível: {{variation.stock_quantity}} </p>\n\n            <p *ngIf="showPrice">Valor à vista: R${{variation.price}}</p>\n\n          </ion-item>\n\n          <ion-item>\n\n            <ion-input type="number" placeholder="Quantidade" name="{{variation.id}}" [(ngModel)]="variation.quantity"></ion-input>\n\n          </ion-item>\n\n        </ion-list>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </form>\n\n  <ion-card *ngIf="product.attributes.length > 0">\n\n    <ion-card-content>\n\n      <ion-card-title>\n\n        Caracteristicas\n\n      </ion-card-title>\n\n      <ion-grid>\n\n        <ion-row *ngFor = "let att of product.attributes">\n\n          <ion-col col-5>\n\n            {{ att.name }}\n\n          </ion-col>\n\n          <ion-col col-7>\n\n            <span *ngFor = "let option of att.options">{{ option }} </span>\n\n          </ion-col>\n\n        </ion-row>\n\n      </ion-grid>\n\n    </ion-card-content>\n\n  </ion-card>\n\n</ion-content>\n\n<ion-footer>\n\n  <ion-toolbar>\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col>\n\n          <ion-item>\n\n            <ion-label>Exibir valor unitário? </ion-label>\n\n            <ion-checkbox (ionChange)="hidePrice(hide)" [(ngModel)] = "hide" value="0"></ion-checkbox>\n\n          </ion-item>\n\n          <button ion-button icon-left block color="default" (click) ="addToCart(form)">\n\n            <ion-icon name="basket"></ion-icon>Adicionar à lista\n\n          </button>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </ion-toolbar>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\product-details\product-details.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_woocommerce_woocommerce__["a" /* WooCommerceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], ProductDetailsPage);

//# sourceMappingURL=product-details.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__menu_menu__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__intro_intro__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tour_tour__ = __webpack_require__(183);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, http, toastCtrl, storage, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.username = "";
        this.password = "";
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    _this.user = userLoginInfo.user;
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
                }
                else {
                    _this.user = {};
                }
            });
        });
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.loading = this.loadingCtrl.create({
            content: 'Conectando...'
        });
        this.loading.present();
        if (this.username != "" || this.password != "") {
            this.http.get("http://mobilestock.com.br/api/auth/generate_auth_cookie?insecure=cool&username=" + this.username + "&password=" + this.password)
                .subscribe(function (res) {
                _this.loading.dismiss();
                var response = res.json();
                if (response.error) {
                    _this.toastCtrl.create({
                        message: response.error,
                        duration: 3000,
                    }).present();
                    return;
                }
                _this.storage.set("userLoginInfo", response).then(function (data) {
                    _this.alertCtrl.create({
                        title: "Conectado com sucesso",
                        message: "Você foi conectado no sistema com sucesso.",
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__menu_menu__["a" /* MenuPage */]);
                                }
                            }]
                    }).present();
                });
            });
        }
        else {
            this.loading.dismiss();
            this.toastCtrl.create({
                message: "Informe o usuário e senha.",
                duration: 3000,
            }).present();
        }
    };
    LoginPage.prototype.redirection = function (send) {
        if (send == "back") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__intro_intro__["a" /* IntroPage */]);
        }
        else if (send == "tour") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__tour_tour__["a" /* TourPage */]);
        }
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-login',template:/*ion-inline-start:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\login\login.html"*/'<ion-content>\n\n  <span style="float:left;">\n\n    <button ion-button clear icon-right color="blueLogo" (click)="redirection(\'back\')"><ion-icon name="arrow-back"></ion-icon>\n\n       Voltar\n\n    </button>\n\n  </span>\n\n  <span style="float:right;">\n\n    <button ion-button clear icon-right color="blueLogo" (click)="redirection(\'tour\')">Ir para tour\n\n       <ion-icon name="arrow-forward"></ion-icon>\n\n    </button>\n\n  </span>\n\n  <ion-card style="margin:0px; border:none; width:100%;">\n\n    <img src="assets/images/login-header.png" style="width:60%; : padding:7%; margin-left: 20%;"/>\n\n    <ion-item>\n\n      <ion-label> <ion-icon name="mail"></ion-icon> </ion-label>\n\n      <ion-input type="text" [(ngModel)] = "username" placeholder="Endereço de email"></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-label> <ion-icon name="lock"></ion-icon> </ion-label>\n\n      <ion-input type="password" [(ngModel)]="password" placeholder="Senha"></ion-input>\n\n    </ion-item>\n\n  </ion-card>\n\n  <button ion-button full color="blueLogo" (click)="login()" class="btnLogin">Entrar</button>\n\n</ion-content>\n\n<ion-footer>\n\n  <div class="box" color="blueLogo">\n\n    <ion-grid>\n\n      <ion-row>\n\n        <ion-col col-lg-12>\n\n          <button class="btnSignup" onclick="window.open(\'http://www.mobilestock.com.br\', \'_system\', \'location=yes\'); return false;" ion-button full color="yellow">Cadastre-se</button>\n\n        </ion-col>\n\n      </ion-row>\n\n      <ion-row>\n\n        <ion-col col-lg-12>\n\n          <img src="assets/images/logo.png"/>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n</ion-footer>\n\n'/*ion-inline-end:"C:\Users\DiogoFerraz\Documents\GitHub\MobileStock\src\pages\login\login.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ })

},[341]);
//# sourceMappingURL=main.js.map