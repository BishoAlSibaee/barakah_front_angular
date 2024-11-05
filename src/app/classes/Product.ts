import { HttpClient } from "@angular/common/http"
import { ProductVariant } from "./ProductVariant"
import { AppComponent } from "../app.component"

export class Product {
    id:number
    store_id:number
    name:string
    local_name:string
    description:string
    local_description:string
    section_id:number
    notes:string
    productvariants:ProductVariant[]

    constructor(id:number,store_id:number,name:string,local_name:string,description:string,local_description:string,section_id:number,notes:string,variants:ProductVariant[]) {
        this.id = id
        this.name = name
        this.store_id = store_id
        this.local_name = local_name
        this.description = description
        this.local_description = local_description
        this.section_id = section_id
        this.notes = notes
        this.productvariants = variants
    }

    static async searchProduct(client:HttpClient,searchWord:string) {
        let url = AppComponent.ProductasUrl + "searchProductsByProductName"
        let params = new FormData()
        params.append("store_id", AppComponent.stor_id.toString())
        params.append("search_word", searchWord)
        
        let result = await fetch(url,{method:'POST',body:params})
        console.log(result)
        return result.json()
      }
}