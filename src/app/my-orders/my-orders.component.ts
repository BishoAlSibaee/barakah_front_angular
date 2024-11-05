import { Component } from '@angular/core';
import { Order } from '../classes/Order';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { translates } from '../classes/translates';
import { MatDialog } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { PopupMessageComponent } from '../popup-message/popup-message.component';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  Orders:Order[] = []

  constructor(
    private client:HttpClient,
    private router:Router,
    private dialog:MatDialog,
    private bottomDialog:MatBottomSheet
  ) {

  }

  ngOnInit() {
    this.getMyOrders()
  }

  back() {
    AppComponent.routeManager.back(this.router)
  }

  getMyOrders() {
    let url = AppComponent.ordersUrl + "getClientOrders"
    let params = new FormData()
    params.append("store_id", AppComponent.stor_id.toString())
    params.append("client_id", AppComponent.myuser.id.toString())
    const h = new HttpHeaders({
      Authorization: `Bearer ${AppComponent.myuser.token}`,
    });
    let options = { headers: h };
    this.dialog.open(LoadingDialogComponent)
    this.client.post<Order[]>(url,params,options).subscribe({next:(result)=>{
      console.log(result)
      this.dialog.closeAll()
      this.Orders = result
      AppComponent.MyOrders = this.Orders
    },error:(error)=>{
      this.dialog.closeAll()
      let conf = new MatBottomSheetConfig()
      conf.data = {"title":translates.translate("error", AppComponent.Store.Language),"message":translates.translate("errorGettingMyOrders", AppComponent.Store.Language)+"\n"+translates.translate("tryAgain",AppComponent.Store.Language)}
      let ddd = this.bottomDialog.open(PopupMessageComponent,conf)
      ddd.afterDismissed().subscribe((result)=>{
        if (result) {
          this.getMyOrders()
        }
      })
    }})
  }

  viewOrder(order:Order) {
    AppComponent.routeManager.goWithExtras('viewOrder',order.id,this.router)
  }

  translateText(id:string) {
    return translates.translate(id,AppComponent.Store.Language)
  }
}
