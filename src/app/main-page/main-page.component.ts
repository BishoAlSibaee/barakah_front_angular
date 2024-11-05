import { Component, ElementRef } from '@angular/core';
import { MENU } from '../classes/MENU';
import { HttpClient , HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Product } from '../classes/Product';
import { AppComponent } from '../app.component';
import { ProjectUrls } from '../classes/ProjectUrls';
import { User } from '../classes/User';
import { CartItem } from '../classes/CartItem';
import { MainPageHeaderComponent } from '../main-page-header/main-page-header.component';
import { STORE } from '../classes/STORE';
import { Country } from '../classes/Country';
import { Currency } from '../classes/Currency';
import { Language } from '../classes/Language';
import { PaymentProvider } from '../classes/PaymentProvider';
import { StorePaymentProvider } from '../classes/StorePaymentProvider';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { Router } from '@angular/router';
import { ProductPageComponent } from '../product-page/product-page.component';
import { state } from '@angular/animations';
import { translates } from '../classes/translates';
import { Section } from '../classes/Section';
import { StoreLogoComponent } from '../store-logo/store-logo.component';
import { Ad } from '../classes/Ad';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  Menues:MENU[] = []
  Products:Product[] = []
  Sections:Section[] = []
  Ads:Ad[] = []
  loading:LoadingDialogComponent|null = null
  static SelectedProduct:Product|null = null
  searchWord = ""
  adShow = ""
  adsVisibility = false

  constructor(
    private client:HttpClient,
    private dialog:MatDialog,
    private router:Router,
    private elementRef: ElementRef
  ) {
    console.log("mainpage construct")
  }

  async ngOnInit() {
    localStorage.setItem("user_id", "6")
    console.log(localStorage.getItem("user_id"))
    let d = this.dialog.open(LoadingDialogComponent)
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#e0e0e0'
    if (AppComponent.Store == null) {
      AppComponent.Store = await this.getStore()
    }
    StoreLogoComponent.logo = AppComponent.Store.logo
    MainPageHeaderComponent.logo = AppComponent.Store.logo
    console.log("store")
    console.log(AppComponent.Store)
    if (AppComponent.myuser == null) {
      AppComponent.myuser = await this.setUser()
      MainPageHeaderComponent.user = AppComponent.myuser
      console.log("user")
      console.log(AppComponent.myuser)
    }
    if (AppComponent.Countries == null) {
      AppComponent.Countries = await this.getCountries()
      this.setStoreCountry()
      console.log("countries")
      console.log(AppComponent.Countries)
    }
    
    if (AppComponent.Currencies == null) {
      AppComponent.Currencies = await this.getCurrencies()
      this.setStoreCurrencies()
      console.log("currencies")
      console.log(AppComponent.Currencies)
    }
    if (AppComponent.Languages == null) {
      AppComponent.Languages = await this.getLanguages()
      this.setStoreLanguage()
      console.log("languages")
      console.log(AppComponent.Languages)
    }
    if (AppComponent.DeliveryTypes == null) {
      AppComponent.DeliveryTypes = await this.getDeliveryTypes()
      this.setStoreDeliveryType()
      console.log("deliveryTypes")
      console.log(AppComponent.Store.DeliveryType)
    }
    if (AppComponent.paymentProviders == null) {
      AppComponent.paymentProviders = await this.getPaymentProviders()
      console.log("providers")
      console.log(AppComponent.paymentProviders)
    }
    if (AppComponent.Sections == null || AppComponent.Sections.length == 0) {
      AppComponent.Sections = await this.getSections()
      this.Sections = AppComponent.Sections
      console.log("sections")
      console.log(AppComponent.Sections)
    }
    else {
      this.Sections = AppComponent.Sections
    }
    if (AppComponent.products == null || AppComponent.products.length == 0) {
      AppComponent.products = await this.getProducts()
      this.Products = AppComponent.products
      console.log("products")
      console.log(AppComponent.products)
    }
    else {
      this.Products = AppComponent.products
    }
    if (AppComponent.Ads == null || AppComponent.Ads.length == 0) {
      AppComponent.Ads = await this.getAds()
      this.Ads = AppComponent.Ads
      this.setAds()
      console.log("ads")
      console.log(this.Ads)
    }
    else {
      this.Ads = AppComponent.Ads
      this.setAds()
    }
    AppComponent.storePaymentProviders = await this.getStorePaymentProviders()
    AppComponent.storePaymentProviders.forEach((spp)=>{
      AppComponent.paymentProviders.forEach((pp)=>{
        if (spp.provider_id == pp.id) {
          spp.name = pp.name
          spp.generalName = pp.generalName
        }
      })
    })
    console.log("s providers")
    console.log(AppComponent.storePaymentProviders)
    MainPageComponent.getCartItems(this.client)
    d.close()
  }

  async getSections() {
    let url = AppComponent.ProductasUrl + "getAllSections"
    let params = new FormData()
    params.append("store_id", AppComponent.stor_id.toString())
    let result = await fetch(url,{method:'POST',body:params})
    return result.json()
  }

  getSectionName(section:Section) {
    if (AppComponent.Store != null) {
      if (AppComponent.Store.Language != null) {
        if (AppComponent.Store.Language.code == "ar") {
          return section.local_name
        }
        else {
          return section.name
        }
      }
      else {
        return section.name
      }
    }
    else {
      return section.name 
    }
  }

  async getProducts() {
    let url = AppComponent.ProductasUrl + "getAll?store_id="+AppComponent.stor_id
    let result = await fetch(url,{method:'GET'})
    return result.json()
  }

  async getAds() {
    let url = AppComponent.adsUrl + "getActiveAds"
    let result = await fetch(url,{method:'GET'})
    return result.json()
  }

  getSectionProducts(section:Section) {
    AppComponent.routeManager.goWithExtras("sectionProducts", section.id, this.router)
  }


  public static getCartItems(client:HttpClient) {
    let params = new FormData()
    if (AppComponent.UserId != null) {
      console.log(AppComponent.UserId)
      params.append("client_id", AppComponent.UserId)
      params.append("store_id", AppComponent.stor_id.toString())
      client.post<any>(ProjectUrls.getUserCartItems,params).subscribe({next:(result)=>{
        console.log("cart resp ")
        console.log(result)
        AppComponent.CartItems = result.items
        if (AppComponent.CartItems != null && AppComponent.CartItems != undefined) {
          for (let i=0;i<AppComponent.CartItems.length;i++) {
            AppComponent.CartItems[i].product = result.products[i]
            AppComponent.CartItems[i].variant = result.variants[i]
          }
        }
        MainPageHeaderComponent.setCartItemsCount(AppComponent.CartItems.length)
      },error:(error)=>{
        console.log(error)
      }})
    }
  }

  async getStorePaymentProviders() {
    console.log(AppComponent.myuser.token)
    let url = AppComponent.storeUrl + "getStorePaymentProviders"
    let params = new FormData()
    params.append("store_id",AppComponent.Store.id.toString())
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${AppComponent.myuser.token}`);
    let result = await fetch(url,{method:'POST',body:params,headers:requestHeaders})
    return result.json()
  }

  productPage(product:Product) {
    MainPageComponent.SelectedProduct = product
    AppComponent.routeManager.go("productPage", this.router)
  }


  async searchProduct() {
    if (this.searchWord != null && this.searchWord != undefined && this.searchWord != "") {
      let url = AppComponent.ProductasUrl + "searchProductsByProductName"
      let params = new FormData()
      params.append("store_id", AppComponent.stor_id.toString())
      params.append("search_word", this.searchWord)
      this.client.post<any>(url, params).subscribe({next:(result)=>{
        console.log(result)
        if (result.code == 1) {
          this.Products = result.products
        }
      },error:(error)=>{
        console.log(error)
      }})
    }
    else {
      this.Products = AppComponent.products
    }
  }

  translate(id:string) {
    return translates.translateText(id)
  }

  async getStore() {
    let url = AppComponent.storeUrl + "getStoreById"
    let params = new FormData()
    params.append("id",AppComponent.stor_id.toString())
    let result = await fetch(url,{method:'POST',body:params})
    return result.json()
  }

  async makeNewDefaultUser() {
    let url = AppComponent.clientsUrl + "addDefaultClient"
    let params = new FormData()
    params.append("store_id", AppComponent.stor_id.toString())
    let result = await fetch(url,{method:'POST',body:params})
    return result.json()
  }

  async getUser() {
    let url = AppComponent.clientsUrl + "getClientById"
    let params = new FormData()
    params.append("store_id", AppComponent.stor_id.toString())
    params.append("user_id", AppComponent.UserId)
    let result = await fetch(url,{method:'POST',body:params})
    return result.json()
}

  async getPaymentProviders() {
    let url = AppComponent.storeUrl + "getPaymentProviders"
    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', `Bearer ${AppComponent.myuser.token}`);
    let result = await fetch(url,{method:'GET',headers:requestHeaders})
    return result.json()
  }

  async setUser() {
    let userId = localStorage.getItem("user_id")
    console.log(userId)
    if (userId == null || userId == "" || userId == undefined) {
      let u = await this.makeNewDefaultUser()
      localStorage.setItem("user_id", u.id.toString())
      return u
    }
    else {
      AppComponent.UserId = userId
      let u = await this.getUser()
      console.log(u)
      if (u.code == 0) {
        let newUser = await this.makeNewDefaultUser()
        localStorage.setItem("user_id", newUser.id)
        return newUser
      }
      return u
    }
  }

  async getCountries() {
    let url = AppComponent.MainUrl + "getCountries"
    let result = await fetch(url,{method:'GET'})
    return result.json()
  }

  async getCurrencies() {
    let url = AppComponent.MainUrl + "getCurrencies"
    let result = await fetch(url,{method:'GET'})
    return result.json()
  }

  async getLanguages() {
    let url = AppComponent.MainUrl + "getLanguages"
    let result = await fetch(url,{method:'GET'})
    return result.json()
  }

  async getDeliveryTypes() {
    let url = AppComponent.MainUrl + "getDeliverytypes"
    let result = await fetch(url,{method:'GET'})
    return result.json()
  }

  setStoreCountry() {
    if (AppComponent.Countries != null) {
      AppComponent.Countries.forEach((country)=>{
        if (country.id == AppComponent.Store.country_id) {
          AppComponent.Store.Country = country
        }
      })
    }
  }

  setStoreCurrencies() {
    if (AppComponent.Currencies != null) {
      AppComponent.Currencies.forEach((currency)=>{
        if (currency.id == AppComponent.Store.currency_id) {
          AppComponent.Store.Currency = currency
        }
      })
    }
  }

  setStoreLanguage() {
    if (AppComponent.Languages != null) {
      AppComponent.Languages.forEach((lang)=>{
        if (lang.id == AppComponent.Store.language_id) {
          AppComponent.Store.Language = lang
        }
      })
    }
  }

  setStoreDeliveryType() {
    if (AppComponent.DeliveryTypes != null) {
      AppComponent.DeliveryTypes.forEach((dt)=>{
        if (dt.id == AppComponent.Store.deliverytype_id) {
          console.log("store dt")
          AppComponent.Store.DeliveryType = dt
          console.log(AppComponent.Store.DeliveryType)
        }
      })
    }
  }

  setAds() {
    if (this.Ads != null && this.Ads.length > 0) {
      this.adShow = this.Ads[0].image_link
      this.adsVisibility = true
      let index = 0
      setInterval(()=>{
        console.log("new run "+index)
        if (index < this.Ads.length) {
          this.adShow = this.Ads[index].image_link
          index++
        }
        else {
          index = 0
          this.adShow = this.Ads[index].image_link
        }
      },6000)
    }
    else {
      this.adsVisibility = false
    }
  }

  adsLeft() {
    let nowIndex = 0
    for (let i=0;i<this.Ads.length;i++) {
      if (this.Ads[i].image_link == this.adShow) {
        nowIndex = i
      }
    }
    if (nowIndex == 0) {
      nowIndex = this.Ads.length-1
      this.adShow = this.Ads[nowIndex].image_link
    }
    else {
      nowIndex = nowIndex-1
      this.adShow = this.Ads[nowIndex].image_link
    }
  }

  adsRight() {
    let nowIndex = 0
    for (let i=0;i<this.Ads.length;i++) {
      if (this.Ads[i].image_link == this.adShow) {
        nowIndex = i
      }
    }
    if (nowIndex == this.Ads.length-1) {
      nowIndex = 0
      this.adShow = this.Ads[nowIndex].image_link
    }
    else {
      nowIndex = nowIndex+1
      this.adShow = this.Ads[nowIndex].image_link
    }
  }
}
