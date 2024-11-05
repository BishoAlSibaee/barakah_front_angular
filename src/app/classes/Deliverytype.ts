import { AppComponent } from "../app.component"

export class Deliverytype {
    id:number
    name:string
    max_days:number
    min_days:number
    max_hours:number
    min_hours:number
    description:string
    description_local:string
    by:string
    coast:number
    coast_id:string
    product_id:string

    constructor(
        id:number,
        name:string,
        max_days:number,
        min_days:number,
        max_hours:number,
        min_hours:number,
        description:string,
        description_local:string,
        by:string,
        coast:number,
        coast_id:string,
        product_id:string
    ) {
        this.id = id
        this.name = name
        this.max_days = max_days
        this.min_days = min_days
        this.by = by
        this.description = description
        this.description_local = description_local
        this.max_hours = max_hours
        this.min_hours = min_hours
        this.coast = coast
        this.coast_id = coast_id
        this.product_id = product_id
    }

    static getDeliveryTypes() {
        AppComponent.client.get<Deliverytype[]>(AppComponent.MainUrl+"getDeliverytypes").subscribe({next:(result)=>{
            console.log("delivery")
            console.log(result)
            AppComponent.DeliveryTypes = result
        },error:(error)=>{
            console.log(error)
        }})
    }
}