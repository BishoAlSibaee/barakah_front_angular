import { Component } from '@angular/core';
import { PaymentProvider } from '../classes/PaymentProvider';
import { AppComponent } from '../app.component';
import { StorePaymentProvider } from '../classes/StorePaymentProvider';
import { HttpClient } from '@angular/common/http';
import { RouteReuseStrategy, Router } from '@angular/router';
import { translates } from '../classes/translates';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmOrderDialogComponent } from '../confirm-order-dialog/confirm-order-dialog.component';

@Component({
  selector: 'app-select-payment-method',
  templateUrl: './select-payment-method.component.html',
  styleUrls: ['./select-payment-method.component.css']
})
export class SelectPaymentMethodComponent {

  PaymentMethods:StorePaymentProvider[]
  SelectedPaymentMethod:StorePaymentProvider

  constructor(
    private client:HttpClient,
    private router:Router,
    private dialog:MatDialog
  ) {
    this.PaymentMethods = AppComponent.storePaymentProviders
    this.SelectedPaymentMethod = AppComponent.storePaymentProviders[0]
  }

  ngOnInit() {

  }

  continueCheckout() {
    AppComponent.routeManager.go('confirmOrder', this.router)   
  }

  translateText(id:string) {
    return translates.translateText(id)
  }

  getDeliveryTranslates(pm:StorePaymentProvider) {
    if (pm.id == 1) {
      return this.translateText('cashOnDelivery')
    }
    else if (pm.id == 2) {
      return this.translateText('visaOrMastercard')
    }
    else {
      return pm.name
    }
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

  setPaymentProvider(i:number) {
    this.SelectedPaymentMethod = this.PaymentMethods[i]
    AppComponent.SelectedPaymentProvider = this.PaymentMethods[i]
    for (let j = 0 ; j<this.PaymentMethods.length ; j++) {
      if (j == i) {
        let item = document.getElementById("x"+j)
        if (item != null) {
          item.style.backgroundColor = "#e0e0e0"
          item.style.border = "solid 1px gray"
        }
      }
      else {
        let item = document.getElementById("x"+j)
        if (item != null) {
          item.style.backgroundColor = "white"
          item.style.border = "none"
        }
      }
    }
  }
}
