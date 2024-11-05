import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { User } from '../classes/User';
import { Language } from '../classes/Language';
import { translates } from '../classes/translates';

@Component({
  selector: 'app-main-page-header',
  templateUrl: './main-page-header.component.html',
  styleUrls: ['./main-page-header.component.css']
})
export class MainPageHeaderComponent {

  public static CartItemsCount:number
  public static logo:string //= "https://samples.checkin.ratco-solutions.com/images/logo.png"
  public static user:User
  languages:Language[] = AppComponent.Languages

  constructor(
    private router:Router
  ) {
    MainPageHeaderComponent.user = new User(0,AppComponent.stor_id,"","","",0,"",0,"")
    MainPageHeaderComponent.CartItemsCount = 0
  }

  ngOnInit() {
    MainPageHeaderComponent.CartItemsCount = AppComponent.CartItems.length
  }

  getUser() {
    return MainPageHeaderComponent.user
  }

  getCartCountNumber() {
    return MainPageHeaderComponent.CartItemsCount
  }

  goToCart() {
    AppComponent.routeManager.go('cart', this.router)
  }

  static setCartItemsCount(count:number) {
    MainPageHeaderComponent.CartItemsCount = count
    this.animate()
  }

  static animate() {
    let x = document.getElementById('cartIcon')
    if (x != null) {
      x.style.animation = "cartAnimation 1s 2"
    }
  }

  backToHome() {
    AppComponent.routeManager.backHome(this.router)
  }

  goToMyProfile() {
    AppComponent.routeManager.go('profile', this.router)
  }

  setLanguageArabic() {
    AppComponent.Store.language_id = 1
    AppComponent.Store.Language = AppComponent.Languages[0]
  }

  setLanguageEnglish() {
    AppComponent.Store.language_id = 2
    AppComponent.Store.Language = AppComponent.Languages[1]
  }

  translateText(id:string) {
    return translates.translate(id,new Language(1,"arabic","ar"))
  }

  goToMyOrders() {
    AppComponent.routeManager.go('myOrders',this.router)
  }

  getLogo() {
    return MainPageHeaderComponent.logo
  }
}
