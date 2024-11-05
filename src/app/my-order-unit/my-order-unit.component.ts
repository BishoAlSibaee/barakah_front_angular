import { Component, Input } from '@angular/core';
import { Order } from '../classes/Order';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-my-order-unit',
  templateUrl: './my-order-unit.component.html',
  styleUrls: ['./my-order-unit.component.css']
})
export class MyOrderUnitComponent {

  @Input() public data:any
  order:Order
  currency:string|undefined = ""

  constructor() {
    this.order = new Order(0,0,0,0,0,0,"",0,0,0,0,0,0,0,"",[])
  }

  ngOnInit() {
    this.order = this.data
    this.currency = AppComponent.Store.Currency?.name
  }

  getOrderTime() {
    let x = this.order.created_at.split("T")
    return x[0]+" "+x[1].split(".")[0]
  }

  setOrderColor() {
    if (this.order.paid == 0) {
      return "#EEEDEB"
    }
    else {
      if (this.order.delivered == 1) {
        return "#939185"
      }
      else {
        return "#E6B9A6"
      }
    } 
  }
}
