import { User } from "./User"

export class Address {
    id :number
    client_id:number
    country_id:number
    city:string
    area:string
    street:string
    fulladdress:string
    building:string
    landmark:string
    client:User


    constructor(id:number,client_id:number,country_id:number,city:string,area:string,street:string,fulladdress:string,building:string,landmark:string,user:User) {
        this.area = area
        this.building = building
        this.city = city
        this.client_id = client_id 
        this.country_id = country_id
        this.fulladdress = fulladdress
        this.id = id
        this.landmark = landmark
        this.street = street
        this.client = user
    }
}