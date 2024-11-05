export class PaymentProvider {
    id:number
    name:string
    generalName:string
    req1:string
    req2:string
    req3:string
    req4:string
    req5:string
    req6:string
    req7:string
    req8:string

    constructor(id:number,name:string,generalName:string,req1:string,req2:string,req3:string,req4:string,req5:string
        ,req6:string,req7:string,req8:string
    ) {
        this.id = id
        this.name = name
        this.generalName = generalName
        this.req1 = req1
        this.req2 = req2
        this.req3 = req3
        this.req4 = req4
        this.req5 = req5
        this.req6 = req6
        this.req7 = req7
        this.req8 = req8
    }
}