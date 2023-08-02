import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { authService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupNoti:boolean=false;
  errorNotifMessage:boolean=false;
  errorNoti:boolean=false;
  constructor(private httpSer:HttpServiceService,private authSer:authService,private http:HttpClient) { }

  ngOnInit() {
  }
  submit(data:any){
    this.http.post<any>(`${this.httpSer.testUrl}/register`,data).subscribe(
      (res)=>{
        if(res){
          this.signupNoti=true;
          setTimeout(() => {
              this.signupNoti=false;
          }, 2000);
        }
      },(error)=>{
        this.errorNotifMessage=error.error.message;
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.errorNoti=true
        setTimeout(() => {
            this.errorNoti=false
        }, 2000);
        console.log(error.error.message)
      }
    )
  }
  }

