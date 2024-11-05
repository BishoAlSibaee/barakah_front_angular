import { Component, Input } from '@angular/core';
import { Address } from '../classes/Address';
import { translates } from '../classes/translates';
import { User } from '../classes/User';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-address-unit',
  templateUrl: './address-unit.component.html',
  styleUrls: ['./address-unit.component.css']
})
export class AddressUnitComponent {

  @Input() public data:any
  address:Address
  selected = false

  constructor() {
    this.address = new Address(0,0,0,"","","","","","",new User(0,0,"","","",0,"",0,""))
  }

  ngOnInit() {
    this.address = this.data
    if (this.address == AppComponent.SelectedAddress) {
      this.selected = true
    }
  }

  translate(id:string) {
    return translates.translateText(id)
  }

  select() {
    return AppComponent.SelectedAddress == this.address
  }

  addressClicked() {
    AppComponent.SelectedAddress = this.address
  }

  setBorder() {
    if (this.address == AppComponent.SelectedAddress) {
      return "solid 1px gray"
    }
    else {
      return "none"
    }
  }
}
