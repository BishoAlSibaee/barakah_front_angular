import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { CartItem } from '../classes/CartItem';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { translates } from '../classes/translates';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {


  caption = "Your Cart is Empty"
  CartItems:CartItem[]

  constructor(
    private client:HttpClient,
    private router:Router,
    private elementRef: ElementRef
  ) {
    this.CartItems = AppComponent.CartItems
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#e0e0e0'
  }

  continueCheckout() {
    if (AppComponent.myuser.verified == 1) {
      // go to login 
      AppComponent.routeManager.go('clientAddress', this.router)
    }
    else {
      // continue to address selector 
      if (AppComponent.myuser.email == "anonymous@anonymous.com") {
        AppComponent.routeManager.go('confirmClientUser', this.router)
      }
      else {
        AppComponent.routeManager.goWithExtras('verifyUser', AppComponent.myuser.email, this.router)
      }
    }
  }

  back() {
    AppComponent.routeManager.back(this.router)
  }

  translateText(id:string) {
    return translates.translate(id, AppComponent.Store.Language)
  }

  getDirection() {
    if (AppComponent.Store.Language.code == "ar") {
      return "rtl"
    }
    else {
      return "ltr"
    }
  }
}
