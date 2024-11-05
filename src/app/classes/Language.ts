import { AppComponent } from "../app.component"

export class Language {
    id:number
    language:string
    code:string

    constructor(id:number,language:string,code:string) {
        this.id = id 
        this.code = code
        this.language = language
    }

    static getLanguages() {
        AppComponent.client.get<Language[]>(AppComponent.MainUrl+"getLanguages").subscribe({next:(result)=>{
            AppComponent.Languages = result
        },error:(error)=>{
            console.log(error)
        }})
    }
}