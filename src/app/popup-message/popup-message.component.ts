import { Component, Inject, Input } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent {

  title = ""
  message = ""

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private me:MatBottomSheetRef<PopupMessageComponent>
  ) {

  }

  ngOnInit() {
    this.title = this.data.title
    this.message = this.data.message
    console.log(this.data)
  }

  accept() {
    this.me.dismiss(true)
  }

  reject() {
    this.me.dismiss(false)
  }
}
