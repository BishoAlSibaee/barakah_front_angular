import { AppComponent } from "../app.component"

export class Country {
    id:number
    code:string
    name:string
    localname:string

    constructor(id:number,code:string,name:string,localname:string) {
        this.code = code
        this.id = id
        this.localname = localname 
        this.name = name
    }

    static getCountries() {
        AppComponent.client.get<Country[]>(AppComponent.MainUrl+"getCountries").subscribe({next:(result)=>{
            AppComponent.Countries = result
        },error:(error)=>{
            console.log(error)
        }})
    }
}