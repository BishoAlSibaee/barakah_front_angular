import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { MainPageHeaderComponent } from './main-page-header/main-page-header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { StoreLogoComponent } from './store-logo/store-logo.component';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MainPageMenuesComponent } from './main-page-menues/main-page-menues.component';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { CartComponent } from './cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { ConfirmClientUserComponent } from './confirm-client-user/confirm-client-user.component';
import {MatFormFieldModule,MatFormFieldControl} from '@angular/material/form-field';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ClientAddressComponent } from './client-address/client-address.component';
import {MatSelectModule} from '@angular/material/select';
import { SelectPaymentMethodComponent } from './select-payment-method/select-payment-method.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { ProductPageComponent } from './product-page/product-page.component';
import {MatListModule} from '@angular/material/list';
import { ClientProfileComponent } from './client-profile/client-profile.component';
import { VerficationCodeComponent } from './verfication-code/verfication-code.component';
import { ConfirmOrderDialogComponent } from './confirm-order-dialog/confirm-order-dialog.component';
import { ConfirmOrderDialogItemComponent } from './confirm-order-dialog-item/confirm-order-dialog-item.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyOrderUnitComponent } from './my-order-unit/my-order-unit.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { PopupMessageComponent } from './popup-message/popup-message.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { AddressUnitComponent } from './address-unit/address-unit.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SectionProductsComponent } from './section-products/section-products.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MainPageHeaderComponent,
    StoreLogoComponent,
    MainPageMenuesComponent,
    ProductComponent,
    CartComponent,
    CartItemComponent,
    ConfirmClientUserComponent,
    ClientAddressComponent,
    SelectPaymentMethodComponent,
    LoadingDialogComponent,
    MessageDialogComponent,
    ProductPageComponent,
    ClientProfileComponent,
    VerficationCodeComponent,
    ConfirmOrderDialogComponent,
    ConfirmOrderDialogItemComponent,
    MyOrdersComponent,
    MyOrderUnitComponent,
    ViewOrderComponent,
    PopupMessageComponent,
    OrderItemComponent,
    AddressUnitComponent,
    SectionProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    HttpClientModule,
    MatCardModule,
    MatBadgeModule,
    MatTableModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule,
    MatBottomSheetModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule.forRoot([{path:'',redirectTo:'/mainPage',pathMatch:'full'},{path:'mainPage',component:MainPageComponent},{path:'cart',component:CartComponent}
      ,{path:'confirmClientUser',component:ConfirmClientUserComponent},{path:'clientAddress',component:ClientAddressComponent}
      ,{path:'selectPaymentMethod',component:SelectPaymentMethodComponent},{path:'productPage',component:ProductPageComponent},
      {path:'profile',component:ClientProfileComponent},{path:'verifyUser/:email',component:VerficationCodeComponent},
      {path:'myOrders',component:MyOrdersComponent},{path:'viewOrder/:order',component:ViewOrderComponent},{path:'confirmOrder',component:ConfirmOrderDialogComponent}
      ,{path:'sectionProducts/:section',component:SectionProductsComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
