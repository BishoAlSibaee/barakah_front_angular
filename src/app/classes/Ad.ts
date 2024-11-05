export class Ad {
    id:number
    title:string
    text:string
    connect_id:number
    connect_table:string
    active:number
    image_link:string

    constructor(
        id:number,
        title:string,
        text:string,
        connect_id:number,
        connect_table:string,
        active:number,
        image_link:string
    ) {
        this.active = active
        this.connect_id = connect_id
        this.connect_table = connect_table
        this.id = id
        this.image_link = image_link
        this.text = text
        this.title = title
    }
}