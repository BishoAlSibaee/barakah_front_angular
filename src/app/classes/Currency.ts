import { AppComponent } from "../app.component"

export class Currency {
    id:number 
    name:string
    code:string
    symbol:string

    constructor(id:number,name:string,code:string,symbol:string) {
        this.id = id
        this.code = code
        this.name = name
        this.symbol = symbol
    }

    static getCurrencies() {
        AppComponent.client.get<Currency[]>(AppComponent.MainUrl+"getCurrencies").subscribe({next:(result)=>{
            AppComponent.Currencies = result
        },error:(error)=>{
            console.log(error)
        }})
    }
}