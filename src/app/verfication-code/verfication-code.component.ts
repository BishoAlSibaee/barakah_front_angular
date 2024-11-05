import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-verfication-code',
  templateUrl: './verfication-code.component.html',
  styleUrls: ['./verfication-code.component.css']
})
export class VerficationCodeComponent {

  email:string = ""
  code:string = ""
  Message:string = ""
  verifyClientUrl = AppComponent.clientsUrl + "verifyClient"
  resendUrl = AppComponent.clientsUrl + "reSendVerficationCode"

  constructor(
    private route:ActivatedRoute,
    private client:HttpClient,
    private router:Router
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(data =>{
      console.log(data['email'])
      this.email = data['email']
    })
    this.resendVerficationCode()
  }

  resendVerficationCode() {
    let params = new FormData()
    params.append("id", AppComponent.UserId)
    this.client.post<any>(this.resendUrl, params).subscribe({next:(result)=>{
      console.log(result)
    },error:(error)=>{
      console.log(error)
    }})
    
  }

  verifyClientUser() {
    let params = new FormData()
    params.append("id", AppComponent.UserId)
    params.append("code", this.code)
    this.client.post<any>(this.verifyClientUrl, params).subscribe({next:(result)=>{
      if (result.code == 1) {
        AppComponent.routeManager.go('mainPage', this.router)
        AppComponent.myuser.verified = 1
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
      if (typeof error == "object") {
        this.Message = AppComponent.handleError(error)
      }
      else {  
        this.Message = error
      }
    }}) 
  }
}
