import { AppComponent } from "../app.component"
import { Country } from "./Country"
import { Currency } from "./Currency"
import { Deliverytype } from "./Deliverytype"
import { Language } from "./Language"

export class STORE {
    id:number
    user_id:number
    name:string
    type:number
    currency_id:number
    country_id:number
    language_id:number
    deliverytype_id:number
    Language:Language
    Country:Country|null = null
    Currency:Currency|null = null
    DeliveryType:Deliverytype|null = null
    logo:string

    constructor(id:number,user_id:number,name:string,type:number,currency_id:number,country_id:number,language_id:number,deliverytype_id:number,lang:Language,logo:string) {
        this.country_id = country_id
        this.currency_id = currency_id
        this.deliverytype_id = deliverytype_id
        this.id = id
        this.language_id = language_id
        this.name = name
        this.type = type
        this.user_id = user_id
        this.Language = lang
        this.logo = logo
    }

    setStoreLanguage() {
       AppComponent.Languages.forEach(lan => {
        if (lan.id == this.language_id) {
            this.Language = lan
        }
       });
    }

    setStoreCountry() {
        AppComponent.Countries.forEach(coun => {
         if (coun.id == this.country_id) {
             this.Country = coun
         }
        });
    }

    setStoreCurrency() {
        AppComponent.Currencies.forEach(curr => {
         if (curr.id == this.currency_id) {
             this.Currency = curr
         }
        });
    }

    setStoreDeliverytype() {
        AppComponent.DeliveryTypes.forEach(del => {
            if (this.deliverytype_id == del.id) {
                this.DeliveryType = del
            }
        });
    }
}