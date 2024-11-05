export class VariantImage {
    id:number
    link:string
    product_id:number
    productvariant_id:number

    constructor(id:number,link:string,product_id:number,productvariant_id:number) {
        this.id = id
        this.link = link
        this.product_id = product_id
        this.productvariant_id = productvariant_id
    }
}