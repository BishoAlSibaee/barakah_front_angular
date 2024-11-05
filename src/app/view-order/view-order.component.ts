import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../classes/Order';
import { AppComponent } from '../app.component';
import { OrderItem } from '../classes/OrderItem';
import { MainPageComponent } from '../main-page/main-page.component';
import { translates } from '../classes/translates';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent {


  order:Order

  constructor(
    private route:ActivatedRoute,
    private client:HttpClient,
    private router:Router
  ) {
    this.order = new Order(0,0,0,0,0,0,"",0,0,0,0,0,0,0,"",[])
  }

  ngOnInit() {
    this.route.params.subscribe(data =>{
      console.log(data['order'])
      AppComponent.MyOrders.forEach((ord)=>{
        if (ord.id == data['order']) {
          this.order = ord
        }
      })
      console.log(this.order)
    })
  }

  back() {
    AppComponent.routeManager.back(this.router)
  }

  translateText(id:string) {
    return translates.translateText(id)
  }

  viewProduct(item:OrderItem) {
    item.product.productvariants = [] 
    item.product.productvariants[0] = item.productvariant
    MainPageComponent.SelectedProduct = item.product
    AppComponent.routeManager.go('productPage', this.router)
  }

  getDirection() {
    if (AppComponent.Store.Language.code == "ar") {
      return "rtl"
    }
    else {
      return "ltr"
    }
  }

  getOrderTime() {
    let x = this.order.created_at.split("T")
    return x[0]+" "+x[1].split(".")[0]
  }
}
