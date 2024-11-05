import { Component, Input } from '@angular/core';
import { Product } from '../classes/Product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { MainPageComponent } from '../main-page/main-page.component';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { translates } from '../classes/translates';
import { Currency } from '../classes/Currency';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() data:any
  Product:Product = new Product(0,1,"","","","",0,"",[])
  go = true
  currency:Currency = new Currency(0,"Saudi Riyal","sar","SAR")

  constructor(
    private client:HttpClient,
    private router:Router,
    private dialog:MatDialog
  ) {
    if (AppComponent.Store.Currency != null) {
      this.currency = AppComponent.Store.Currency
    }
  }

  ngOnInit() {
    this.Product = this.data
  }

  getProductLink(product:Product) {
    if (product.productvariants[0] != null) {
      if (product.productvariants[0].variantsimages[0] != null) {
        if (product.productvariants[0].variantsimages[0].link != null) {
          return product.productvariants[0].variantsimages[0].link
        }
        else {
          return ""
        }
      }
      else {
        return ""
      }
    }
    else {
      return ""
    }
  }

  addToCart(product:Product) {
    console.log("add")
    this.go = false
    setTimeout(()=>{
      this.go = true
    },2000)
    if (AppComponent.myuser != null && AppComponent.myuser != undefined) {
      this.dialog.open(LoadingDialogComponent)
      let url = AppComponent.ordersUrl + "addCartItem"
      let params = new FormData()
      params.append("client_id", AppComponent.myuser.id.toString())
      params.append("product_id", product.id.toString())
      params.append("productvariant_id", product.productvariants[0].id.toString())
      params.append("quantity", "1")
  
      this.client.post<any>(url, params).subscribe({next:(result)=>{
        this.dialog.closeAll()
        console.log(result)
        if (result.code == 1) {
          // product added
          MainPageComponent.getCartItems(this.client)
        }
        else {
          let conf = new MatDialogConfig()
          conf.data = {"title":"error","message":result.error}
          this.dialog.open(MessageDialogComponent,conf)
        }
      },error:(error)=>{
        this.dialog.closeAll()
        let conf = new MatDialogConfig()
          conf.data = {"title":"error","message":error.message}
          this.dialog.open(MessageDialogComponent,conf)
      }})
    }
    else {
      console.log("user null")
    }
  }

  goToProduct(Product:Product) {
    console.log("go")
    if (this.go) {
      MainPageComponent.SelectedProduct = Product
      AppComponent.routeManager.go('productPage', this.router)
    }
  }

  translateText(id:string) {
    return translates.translate(id, AppComponent.Store.Language)
  }

  getProductName() {
    if (AppComponent.Store != null) {
      if (AppComponent.Store.Language != null) {
        if (AppComponent.Store.Language.code == "ar") {
          return this.Product.local_name
        }
        else {
          return this.Product.name
        }
      }
      else {
        return this.Product.name
      }
    }
    else {
      return this.Product.name
    }
  }

  getProductDescription() {
    if (AppComponent.Store != null) {
      if (AppComponent.Store.Language != null) {
        if (AppComponent.Store.Language.code == "ar") {
          return this.Product.local_description
        }
        else {
          return this.Product.description
        }
      }
      else {
        return this.Product.description
      }
    }
    else {
      return this.Product.description
    }
  }

  getProductPrice() {
    if (this.Product != null) {
      if (this.Product.productvariants != null && this.Product.productvariants.length > 0) {
        if (this.getIsOffer()) {
          return this.Product.productvariants[0].offer_price
        }
        else {
          return this.Product.productvariants[0].price
        }
      }
      else {
        return 0
      }
    }
    else return 0
  }

  getProductPriceBeforeOffer() {
    if (this.Product != null) {
      if (this.Product.productvariants != null && this.Product.productvariants.length > 0) {
          return this.Product.productvariants[0].price
      }
      else {
        return 0
      }
    }
    else return 0
  }

  getIsOffer() {
    if (this.Product != null) {
      if (this.Product.productvariants != null && this.Product.productvariants.length > 0) {
        if (this.Product.productvariants[0].offer == 1) {
          return true
        }
        else {
          return false
        }
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  getOfferColor() {
    if (this.getIsOffer()) {
      return "red"
    }
    else {
      return "inherate"
    }
  }
}
