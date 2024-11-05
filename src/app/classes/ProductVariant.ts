import { VariantImage } from "./VariantImage"

export class ProductVariant {
    id:number
    product_id:number
    color:string
    size:string
    form:string
    type:string
    model:string
    quality:string
    power:string
    memory:string
    other1:string
    other2:string
    other3:string
    other4:string
    other5:string
    unit:string
    width:number
    capacity:number
    depth:number
    height:number
    weight:number
    quantity:number
    price:number
    offer:number
    offer_price:number
    description:string
    notes:string
    stripe_product_id:string
    stripe_price_id:string
    offer_stripe_product_id:string
    offer_stripe_price_id:string

    variantsimages:VariantImage[]

    constructor(id:number,product_id:number,color:string,size:string,form:string,type:string,model:string,quality:string,power:string,memory:string,other1:string,other2:string,other3:string
        ,other4:string,other5:string,unit:string,width:number,capacity:number,depth:number,height:number,weight:number,quantity:number,price:number,offer:number,offer_price:number,description:string
        ,notes:string,stripe_product_id:string,stripe_price_id:string,offer_s_p_id:string,offer_s_price_id:string,images:VariantImage[]) {
            this.id = id
            this.product_id = product_id
            this.color = color
            this.size = size
            this.form = form
            this.type = type
            this.model = model
            this.quality = quality
            this.power = power
            this.memory = memory
            this.other1 = other1
            this.other2 = other2
            this.other3 = other3
            this.other4 = other4
            this.other5 = other5
            this.unit = unit
            this.width = width
            this.capacity = capacity
            this.depth = depth
            this.height = height
            this.weight = weight
            this.quantity = quantity
            this.price = price
            this.offer = offer
            this.offer_price = offer_price
            this.description = description
            this.notes = notes
            this.stripe_product_id = stripe_product_id
            this.stripe_price_id = stripe_price_id
            this.offer_stripe_price_id = offer_s_price_id
            this.offer_stripe_product_id = offer_s_p_id
            this.variantsimages = images
    }
    
}