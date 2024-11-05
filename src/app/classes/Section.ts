export class Section {
    id:number
    store_id:number
    name:string
    local_name:string
    description:string
    local_description:string
    image:string

    constructor(
        id:number,
        store_id:number,
        name:string,
        local_name:string,
        description:string,
        local_description:string,
        image:string,
    ) 
    {
        this.id = id
        this.image = image
        this.description = description
        this.local_description = local_description
        this.local_name = local_name
        this.name = name
        this.store_id = store_id
    }
}