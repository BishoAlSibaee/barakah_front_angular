import { Component, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Address } from '../classes/Address';
import { Country } from '../classes/Country';
import { Deliverytype } from '../classes/Deliverytype';
import { APP_BASE_HREF } from '@angular/common';
import { Route, Router } from '@angular/router';
import { translates } from '../classes/translates';

@Component({
  selector: 'app-client-address',
  templateUrl: './client-address.component.html',
  styleUrls: ['./client-address.component.css']
})
export class ClientAddressComponent {

  Addresses:Address[] = []
  countries:Country[] = AppComponent.Countries
  Message = ""
  landmark = ""
  Country:Country
  city = ""
  area = ""
  fullAddress = ""
  street = ""
  buildingNumber = ""
  addAddressVisible = false
  addressesVisibility = true
  SelectedAddress:Address
  StoreDelivery:Deliverytype|null = null

  constructor(
    private client:HttpClient,
    private router:Router,
    private elementRef: ElementRef
  ) {
    this.Country = this.countries[0]
    this.SelectedAddress = AppComponent.SelectedAddress
    console.log("delivery type")
    console.log(AppComponent.DeliveryTypes)
    console.log(AppComponent.Store.deliverytype_id)
    
  }

  ngOnInit() {
    this.elementRef.nativeElement.ownerDocument
            .body.style.backgroundColor = '#e0e0e0'
    AppComponent.DeliveryTypes.forEach((tb)=>{
      if (tb.id == AppComponent.Store.deliverytype_id) {
        this.StoreDelivery = tb
      }
    })
    console.log(this.StoreDelivery)
    this.getClientAddresses()
  }

  addAddressShowHide() {
    if (this.addAddressVisible) {
      this.addAddressVisible = false
      this.addressesVisibility = true
    }
    else {
      this.addAddressVisible = true
      this.addressesVisibility = false
    }
  }

  getClientAddresses() {
    let url = AppComponent.clientsUrl + "getClientAddresses"
    let params = new FormData()
    params.append("client_id", AppComponent.myuser.id.toString())
    this.client.post<any>(url, params).subscribe({next:(result)=>{
      this.Addresses = result.addresses
      console.log(this.Addresses)
      if (this.Addresses == null || this.Addresses.length == 0) {
        this.addressesVisibility = false
        this.SelectedAddress = this.Addresses[0]
      }
      else {
        this.addressesVisibility = true
      }
    },error:(error)=>{
      console.log(error)
    }})
  }

  addAddress() {
    this.Message = ""
    if (this.Country == null || this.Country == undefined || this.Country.name == "") {
      this.Message = "please select your country"
      return
    }
    if (this.city == null || this.city == undefined || this.city == "") {
      this.Message = "please enter your city"
      return
    }
    if (this.street == null || this.street == undefined || this.street == "") {
      this.Message = "please enter your street"
      return
    }
    if (this.area == null || this.area == undefined || this.area == "") {
      this.Message = "please enter yout area"
      return
    }
    if (this.buildingNumber == null || this.buildingNumber == undefined || this.buildingNumber == "") {
      this.Message = "please enter building number"
      return
    }
    let url = AppComponent.clientsUrl + "addNewAddress"
    let params = new FormData()
    params.append("client_id", AppComponent.myuser.id.toString())
    params.append("city", this.city)
    params.append("street", this.street)
    params.append("fulladress", this.fullAddress)
    params.append("country_id", this.Country.id.toString())
    params.append("building", this.buildingNumber)
    params.append("area", this.area)
    params.append("landmark", this.landmark)
    this.client.post<any>(url, params).subscribe({next:(result)=>{
      console.log(result)
      if (result.result == "success") {
        this.addAddressVisible = false
        this.Addresses.unshift(result.address)
      }
      else {
        this.Message = result.error
      }
      this.Message = this.Message
    },error:(error)=>{
        console.log(error)
        this.Message = error
    }})
  }

  continueCheckout() {
    if (this.SelectedAddress != null && this.SelectedAddress != undefined) {
      AppComponent.SelectedAddress = this.SelectedAddress
      AppComponent.routeManager.go('selectPaymentMethod', this.router)
    }
    else {
      this.Message = "please select address"
    }
  }

  selectAddress(address:Address) {
    this.SelectedAddress = address
    for (let i=0;i<this.Addresses.length;i++) {
      if (this.Addresses[i].id == address.id) {
        let item = document.getElementById("add"+i)
        if (item != null) {
          console.log("not null")
          item.style.backgroundColor = "#e0e0e0"
        }
      }
      else {
        console.log("unequal")
        let item = document.getElementById("add"+i)
        if (item != null) {
          item.style.border = "white"
        }
      }
    }
  }

  translateText(id:string) {
    return translates.translate(id, AppComponent.Store.Language)
  }

  getDeliveryDescription(type:Deliverytype|null) {
    if (type != null) {
      if (AppComponent.Store.Language.code == "ar") {
        return type.description_local
      }
      else {
        return type.description
      }
    }
    else {
      return ""
    }
  }

  getDirection() {
    if (AppComponent.Store.Language.code == "ar") {
      return "rtl"
    }
    else {
      return "ltr"
    }
  }

  back() {
    AppComponent.routeManager.back(this.router)
  }

}
