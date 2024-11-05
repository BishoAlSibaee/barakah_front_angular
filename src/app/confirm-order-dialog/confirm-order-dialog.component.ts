import { Component } from '@angular/core';
import { CartItem } from '../classes/CartItem';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MainPageHeaderComponent } from '../main-page-header/main-page-header.component';
import { translate } from '../classes/translate';
import { translates } from '../classes/translates';
import { Router } from '@angular/router';
import { Address } from '../classes/Address';
import { StorePaymentProvider } from '../classes/StorePaymentProvider';

@Component({
  selector: 'app-confirm-order-dialog',
  templateUrl: './confirm-order-dialog.component.html',
  styleUrls: ['./confirm-order-dialog.component.css']
})
export class ConfirmOrderDialogComponent {

  CartItems:CartItem[] = []
  confirmOrderUrl = AppComponent.ordersUrl + "addOrder"
  errorMessage = ""
  deliveryCoast = 0
  total = 0
  address:Address
  paymentMethod:StorePaymentProvider

  constructor(
    private client:HttpClient,
    private dialog:MatDialog,
    private router:Router
  ) {
    this.CartItems = AppComponent.CartItems
    this.address = AppComponent.SelectedAddress
    this.paymentMethod = AppComponent.SelectedPaymentProvider
    if (AppComponent.Store.DeliveryType != null) {
      this.deliveryCoast = AppComponent.Store.DeliveryType.coast
    }
  }

  ngOnInit() {
    console.log(this.deliveryCoast)
    console.log(this.CartItems.length)
  }

  confirmOrder() {
    if (AppComponent.SelectedPaymentProvider.provider_id == 1) {
      // cash on delivery
      this.saveOrder()
    }
    else if (AppComponent.SelectedPaymentProvider.provider_id == 2) {
      // stripe
      let url = AppComponent.clientsUrl + "createStripePaymentLink"
      let params = new FormData()
      console.log("prices" + AppComponent.CartItems.length)
      for (let i=0;i < AppComponent.CartItems.length;i++) {
        if (AppComponent.CartItems[i].variant?.offer == 1) {
          let price = AppComponent.CartItems[i].variant?.offer_stripe_price_id
          let quantity = AppComponent.CartItems[i].quantity
          if (price != null) {
            params.append("prices["+i+"]", price.toString())
            console.log("price " + price)
          }
          params.append("quantities["+i+"]", quantity.toString())
        }
        else {
          let price = AppComponent.CartItems[i].variant?.stripe_price_id
          let quantity = AppComponent.CartItems[i].quantity
          if (price != null) {
            params.append("prices["+i+"]", price.toString())
            console.log("price " + price)
          }
          params.append("quantities["+i+"]", quantity.toString())
        }
      }
      if (AppComponent.Store.DeliveryType?.coast_id != null) {
        params.append("prices["+AppComponent.CartItems.length+"]", AppComponent.Store.DeliveryType?.coast_id)
      }
      params.append("quantities["+AppComponent.CartItems.length+"]", "1")
      //params.append("store_id",AppComponent.stor_id.toString())
      //params.append("success_url", "https://youtube.com")
      //params.append("return_url", "https://google.com")
      //params.append("customer", "cus_OXQnvMyh3j2Sh6")
      this.client.post<any>(url, params).subscribe({next:(result)=>{
        console.log(result)
        if (result.url != null) {
          window.location.href = result.url
        }
      },error:(error)=>{
        console.log(error)
      }})
    }
    else {
      // other 
    } 
  }

  saveOrder() {
    let params = new FormData()
    params.append("store_id", AppComponent.stor_id.toString())
    params.append("client_id", AppComponent.myuser.id.toString())
    params.append("clientaddress_id", AppComponent.SelectedAddress.id.toString())
    params.append("shipping_fees", this.deliveryCoast.toString())
    params.append("other_fees", "0")
    params.append("payment_id", "0")
    const h = new HttpHeaders({
      Authorization: `Bearer ${AppComponent.myuser.token}`,
    });
    let options = { headers: h };
    this.client.post<any>(this.confirmOrderUrl, params, options).subscribe({next:(result)=>{
      console.log(result)
      if (result.code == 1) {
        let conf = new MatDialogConfig()
        conf.data = {"title":"Order Save","message":"تم حفظ الطلب وسيتم التواصل معكم لتوصيل الطلب"}
        let d = this.dialog.open(MessageDialogComponent,conf)
        AppComponent.CartItems = []
        MainPageHeaderComponent.CartItemsCount = 0
        d.afterClosed().subscribe(()=>{
        })
      }
      else {
        if (typeof result.error == "object") {
          this.errorMessage = AppComponent.handleError(result.error)
        }
        else {
          this.errorMessage = result.error
        }
      }
    },error:(error)=>{
      console.log(error)
      if (typeof error == "object") {
        this.errorMessage = AppComponent.handleError(error)
      }
      else {
        this.errorMessage = error
      }
    }})
  }

  getDirection() {
    if (AppComponent.Store.Language.code == "ar") {
      return "rtl"
    }
    else {
      return "ltr"
    }
  }

  getTotal() {
    this.total = 0
    this.CartItems.forEach((item)=>{
      if (item.variant != null) {
        if (item.variant.offer == 1) {
          this.total += item.variant?.offer_price * item.quantity
        }
        else {
          this.total += item.variant?.price * item.quantity
        }
      }
    })
    this.total = this.total + this.deliveryCoast
    return this.total
  }

  translate(id:string) {
    return translates.translateText(id)
  }

  back() {
    AppComponent.routeManager.back(this.router)
  }

  getPaymentIcon(p:StorePaymentProvider) {
    if (p.id == 1) {
      return "payments"
    }
    else if (p.id == 2) {
      return "credit_card"
    }
    else {
      return ""
    }
  }

  getDeliveryTranslates(pm:StorePaymentProvider) {
    if (pm.id == 1) {
      return this.translate('cashOnDelivery')
    }
    else if (pm.id == 2) {
      return this.translate('visaOrMastercard')
    }
    else {
      return pm.name
    }
  }
}
