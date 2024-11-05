import { Product } from "./Product"
import { ProductVariant } from "./ProductVariant"

export class OrderItem {

    id:number
    order_id:number
    product_id:number
    productvariant_id:number
    quantity:number
    product:Product
    productvariant:ProductVariant

    constructor(
        id:number,
        order_id:number,
        product_id:number,
        productvariant_id:number,
        quantity:number,
        product:Product,
        productvariant:ProductVariant
    ) {
        this.id = id 
        this.order_id = order_id
        this.product_id = product_id
        this.productvariant_id = productvariant_id
        this.quantity = quantity
        this.product = product
        this.productvariant = productvariant
    }
}