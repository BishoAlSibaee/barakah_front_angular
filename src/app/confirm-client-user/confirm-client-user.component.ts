import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-confirm-client-user',
  templateUrl: './confirm-client-user.component.html',
  styleUrls: ['./confirm-client-user.component.css']
})
export class ConfirmClientUserComponent {

  email = ""
  name = ""
  mobile = ""
  password = ""
  passwordConfirm = ""
  Message = ""
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private client:HttpClient,
    private router:Router,
    private dialog:MatDialog
  ) {

  }

  ngInit() {

  }

  confirmClientUser() {
    this.Message = ""
    if (this.email == undefined || this.email == null || this.email == "") {
      this.Message = "please enter your email"
      return
    }
    let x = this.email.split("@")
    let y = this.email.split(".")
    if (x[0] == undefined || x[1] == undefined || y[0] == undefined || y[1] == undefined || y[1] == "") {
      this.Message = "email is not correct"
      return
    }
    if (this.name == undefined || this.name == null || this.name == "") {
      this.Message = "please enter your name"
      return
    }
    if (this.mobile == undefined || this.mobile == null || this.mobile == "") {
      this.Message = "please enter your mobile number"
      return
    }
    if (this.password == undefined || this.password == null || this.password == "") {
      this.Message = "please enter your password"
      return
    }
    if (this.passwordConfirm == undefined || this.passwordConfirm == null || this.passwordConfirm == "") {
      this.Message = "please enter your password confirmation"
      return
    }
    let url = AppComponent.clientsUrl + "confirmClient"
    let params = new FormData()
    params.append("id", AppComponent.myuser.id.toString())
    params.append("email", this.email)
    params.append("name", this.name)
    params.append("mobile", this.mobile)
    params.append("password", this.password)
    params.append("password_confirmation", this.passwordConfirm)
    params.append("confirmBy", "email")
    this.client.post<any>(url, params).subscribe({next:(result)=>{
      console.log(result)
      if (result.result == "success") {
        AppComponent.routeManager.goWithExtras('verifyUser',this.email, this.router)
      }
      else {
        if (typeof result.error == "object") {
          this.Message = AppComponent.handleError(result.error)
        }
        else {
          this.Message = result.error
        }
      }
    },error:(error)=>{
      console.log(error)
      if (typeof error == "object") {
        this.Message = AppComponent.handleError(error)
      }
      else {
        this.Message = error
      }
    }})
  }
}
