import { Component } from '@angular/core';
import { Product } from '../classes/Product';
import { Router } from '@angular/router';
import { MainPageComponent } from '../main-page/main-page.component';
import { ProductVariant } from '../classes/ProductVariant';
import { VariantImage } from '../classes/VariantImage';
import { Currency } from '../classes/Currency';
import { AppComponent } from '../app.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { HttpClient } from '@angular/common/http';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { translates } from '../classes/translates';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent {

  product:Product|any
  variant:ProductVariant|any
  images:VariantImage[]|undefined
  selectedImage:VariantImage|undefined
  variants:ProductVariant[] = []
  currency:Currency|null

  constructor(
    private router:Router,
    private dialog:MatDialog,
    private client:HttpClient
  ) {
    this.currency = AppComponent.Store.Currency
    this.product = MainPageComponent.SelectedProduct
    if (this.product != undefined) {
      this.variant = this.product?.productvariants[0]
    }
    this.images = this.variant?.variantsimages
    if (this.images != undefined) {
      this.selectedImage = this.images[0]
    }
    if (this.product?.productvariants != undefined) {
      this.variants = this.product?.productvariants
    }
  }

  ngOnInit() {
    console.log(this.product)
  }

  imageClicked(image:VariantImage) {
    this.selectedImage = image
  }

  addToCart() {
    console.log("add")
    if (AppComponent.myuser != null && AppComponent.myuser != undefined) {
      this.dialog.open(LoadingDialogComponent)
      let url = AppComponent.ordersUrl + "addCartItem"
      let params = new FormData()
      params.append("client_id", AppComponent.myuser.id.toString())
      params.append("product_id", this.product.id.toString())
      params.append("productvariant_id", this.product.productvariants[0].id.toString())
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

  back() {
    AppComponent.routeManager.back(this.router)
  }

  translateText(id:string) {
    return translates.translate(id, AppComponent.Store.Language)
  }

}
