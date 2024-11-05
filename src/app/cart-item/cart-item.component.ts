import { Component, Input } from '@angular/core';
import { CartItem } from '../classes/CartItem';
import { AppComponent } from '../app.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { translates } from '../classes/translates';
import { MainPageHeaderComponent } from '../main-page-header/main-page-header.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @Input() data:any
  Item:CartItem = new CartItem(0,0,0,0,0,0)

  constructor(
    private client:HttpClient
  ) {

  }

  ngOnInit() {
    this.Item = this.data
  }

  getIsOffer() {
    if (this.Item.variant?.offer == 1) {
      return true
    }
    else {
      return false
    }
  }

  getItemImage() {
    return this.Item.variant?.variantsimages[0].link
  }

  getOfferColor() {
    if (this.Item.variant?.offer == 1) {
      return "red"
    }
    else {
      return ""
    }
  }

  increaseQuantity() {
    let newQuantity = this.Item.quantity + 1
    let url = AppComponent.ordersUrl + "modifyItemQuantity"
    const h = new HttpHeaders({
      Authorization: `Bearer ${AppComponent.myuser.token}`,
    });
    let requestOptions = { headers: h };
    let params = new FormData()
    params.append("client_id", AppComponent.myuser.id.toString())
    params.append("product_id", this.Item.product_id.toString())
    params.append("productvariant_id", this.Item.productvariant_id.toString())
    params.append("quantity", newQuantity.toString())
    this.client.post<any>(url,params,requestOptions).subscribe({next:(result)=>{
      console.log(result)
      if (result.code == 1) {
        this.Item.quantity = newQuantity
      }
    },error:(error)=>{
      console.log(error)
    }})
  }

  decreaseQuantity() {
    let newQuantity = this.Item.quantity - 1
    if (newQuantity == 0) {
      let url = AppComponent.ordersUrl + "deleteUserCartItem"
      const h = new HttpHeaders({
        Authorization: `Bearer ${AppComponent.myuser.token}`,
      });
      let requestOptions = { headers: h };
      let params = new FormData()
      params.append("client_id", AppComponent.myuser.id.toString())
      params.append("product_id", this.Item.product_id.toString())
      params.append("productvariant_id", this.Item.productvariant_id.toString())
      this.client.post(url, params,requestOptions).subscribe({next:(result)=>{
        console.log(result)
        AppComponent.CartItems.splice(AppComponent.CartItems.indexOf(this.Item),1)
        MainPageHeaderComponent.CartItemsCount = AppComponent.CartItems.length
      },error:(error)=>{
        console.log(error)
      }})
    }
    else {
      let url = AppComponent.ordersUrl + "modifyItemQuantity"
      const h = new HttpHeaders({
        Authorization: `Bearer ${AppComponent.myuser.token}`,
      });
      let requestOptions = { headers: h };
      let params = new FormData()
      params.append("client_id", AppComponent.myuser.id.toString())
      params.append("product_id", this.Item.product_id.toString())
      params.append("productvariant_id", this.Item.productvariant_id.toString())
      params.append("quantity", newQuantity.toString())
      this.client.post<any>(url,params,requestOptions).subscribe({next:(result)=>{
        console.log(result)
        if (result.code == 1) {
          this.Item.quantity = newQuantity
        }
      },error:(error)=>{
        console.log(error)
      }})
    }
  }

  getItemPrice(item:CartItem) {
    if (item.variant != undefined) {
      if (item.variant.offer == 1) {
        return item.quantity * item.variant?.offer_price
      }
      else {
        return item.quantity * item.variant?.price
      }
    }
    else {
      return 0 
    }
  }

  translateText(id:string) {
    return translates.translate(id, AppComponent.Store.Language)
  }
}
