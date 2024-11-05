import { Component, Input } from '@angular/core';
import { Order } from '../classes/Order';
import { OrderItem } from '../classes/OrderItem';
import { Product } from '../classes/Product';
import { ProductVariant } from '../classes/ProductVariant';
import { translates } from '../classes/translates';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent {

  @Input() data:any
  item:OrderItem = new OrderItem(0,0,0,0,0,new Product(0,0,"","","","",0,"",[]),new ProductVariant(0,0,"","","","","","","","","","","","","","",0,0,0,0,0,0,0,0,0,"","","","","","",[]))

  constructor() {

  }

  ngOnInit() {
    this.item = this.data
  }

  translateText(id:string) {
    return translates.translateText(id)
  }


}
