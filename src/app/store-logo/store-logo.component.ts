import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-logo',
  templateUrl: './store-logo.component.html',
  styleUrls: ['./store-logo.component.css']
})
export class StoreLogoComponent {

  @Input() data:any
  static logo = ""

  constructor() {
  }

  ngOnInit() {
    if (this.data == undefined || this.data == null || this.data == "") {
      StoreLogoComponent.logo = ""
    }
    else {
      StoreLogoComponent.logo = this.data
    }
  }

  getLogo() {
    return StoreLogoComponent.logo
  }
  
}
