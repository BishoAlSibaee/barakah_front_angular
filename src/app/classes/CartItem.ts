import { Product } from "./Product"
import { ProductVariant } from "./ProductVariant"

export class CartItem {
    id:number
    store_id:number
    client_id:number
    product_id:number
    productvariant_id:number
    quantity:number
    product:Product | undefined
    variant:ProductVariant | undefined

    constructor(id:number,store_id:number,client_id:number,product_id:number,productvariant_id:number,quantity:number) {
        this.id = id
        this.client_id = client_id
        this.product_id = product_id
        this.productvariant_id = productvariant_id
        this.quantity = quantity
        this.store_id = store_id
    }
}