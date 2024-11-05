import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {

  title = ""
  message = ""
  

  constructor(
    @Inject (MAT_DIALOG_DATA) private data:any
  ) {
    
  }

  ngOnInit() {
    this.title = this.data.title
    this.message = this.data.message
  }

}
