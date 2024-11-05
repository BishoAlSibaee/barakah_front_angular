import { Component } from '@angular/core';
import { User } from './classes/User';
import { CartItem } from './classes/CartItem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from './classes/Country';
import { Currency } from './classes/Currency';
import { Language } from './classes/Language';
import { STORE } from './classes/STORE';
import { Deliverytype } from './classes/Deliverytype';
import { Address } from './classes/Address';
import { ProjectUrls } from './classes/ProjectUrls';
import { PaymentProvider } from './classes/PaymentProvider';
import { StorePaymentProvider } from './classes/StorePaymentProvider';
import { Product } from './classes/Product';
import { translates } from './classes/translates';
import { Order } from './classes/Order';
import { RouteManager } from './classes/RouteManager';
import { Section } from './classes/Section';
import { StoreLogoComponent } from './store-logo/store-logo.component';
import { MainPageHeaderComponent } from './main-page-header/main-page-header.component';
import { Ad } from './classes/Ad';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Barakeh'
  static stor_id = 1
  //static MainUrl = "https://store-test.ratco-solutions.com/api/"
  static MainUrl = "http://127.0.0.1:8000/api/"
  static ProductasUrl = AppComponent.MainUrl + "products/"
  static clientsUrl = AppComponent.MainUrl + "clients/"
  static ordersUrl = AppComponent.MainUrl + "orders/"
  static adsUrl = AppComponent.MainUrl + "ads/"
  static storeUrl = AppComponent.MainUrl
  static UserId:string
  static myuser:User
  static products:Product[] = []
  static Sections:Section[] = []
  static CartItems:CartItem[] = []
  static client:HttpClient
  static Currencies:Currency[]
  static Languages:Language[]
  static Countries:Country[]
  static DeliveryTypes:Deliverytype[]
  static MyOrders:Order[]
  static Ads:Ad[]
  static StoreDeliveryType:Deliverytype
  static Store:STORE
  static SelectedAddress:Address
  static SelectedPaymentProvider:StorePaymentProvider
  static paymentProviders:PaymentProvider[] = []
  static storePaymentProviders:StorePaymentProvider[]=[]
  static routeManager :RouteManager
  static AppComponent: Promise<STORE>;


  constructor(
    public client:HttpClient
  ) {
    AppComponent.routeManager = new RouteManager()
    AppComponent.client = this.client
    translates.make()
  }

  async ngOnInit() {
  }

  getStorePaymentProviders() {
    let url = AppComponent.storeUrl + "getStorePaymentProviders"
    const h = new HttpHeaders({
      Authorization: `Bearer ${AppComponent.myuser.token}`,
    })
    let options = { headers: h }
    let params = new FormData()
    params.append("store_id",AppComponent.Store.id.toString())
    this.client.post(url,params, options).subscribe({next:(result)=>{
      console.log(result)
    },error:(error)=>{
      console.log(error)
    }})
  }

  public static handleError(error:object) {
    let er = ""
    let keys = Object.keys(error)
    let values = Object.values(error)
    for (let i=0;i<keys.length;i++) {
      if (i == keys.length-1) {
        er = er + keys[i]+" : "+values[i]
      }
      else {
        er = er + keys[i]+" : "+values[i]+"\n"
      }
    }
    return er
  }
}
