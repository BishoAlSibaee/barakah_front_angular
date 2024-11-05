export class User {
    id:number
    store_id:number
    name:string
    email:string
    mobile:string
    verified:number
    verifiedAt:string
    registered:number
    token:string

    constructor(id:number,store_id:number,name:string,email:string,mobile:string,verified:number,verifiedAt:string,registered:number,token:string) {
        this.id = id
        this.email = email
        this.mobile = mobile
        this.name = name
        this.registered = registered
        this.store_id = store_id
        this.verified = verified
        this.verifiedAt = verifiedAt
        this.token = token
    }

    public isVerified =  () => {
        return this.verified == 1
    }
}