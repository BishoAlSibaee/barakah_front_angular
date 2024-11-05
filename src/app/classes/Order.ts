import { OrderItem } from "./OrderItem"

export class Order {
    id:number
    store_id:number
    clientaddress_id:number
    products_count:number
    products_items_count:number
    amount:number
    promocode:string
    promocode_discount:number
    shipping_fees:number
    other_fees:number
    final_amount:number
    payment_id:number
    paid:number
    delivered:number
    created_at:string
    orderitems:OrderItem[]


    constructor(
        id:number,
        store_id:number,
        clientaddress_id:number,
        products_count:number,
        products_items_count:number,
        amount:number,
        promocode:string,
        promocode_discount:number,
        shipping_fees:number,
        other_fees:number,
        final_amount:number,
        payment_id:number,
        paid:number,
        delivered:number,
        created_at:string,
        orderitems:OrderItem[]
    ) {
        this.amount = amount
        this.clientaddress_id = clientaddress_id
        this.created_at = created_at
        this.final_amount = final_amount
        this.id = id
        this.other_fees = other_fees
        this.payment_id = payment_id
        this.products_count = products_count
        this.products_items_count = products_items_count
        this.promocode = promocode
        this.promocode_discount = promocode_discount
        this.shipping_fees = shipping_fees
        this.store_id = store_id
        this.paid = paid
        this.delivered = delivered
        this.orderitems = orderitems
    }
}