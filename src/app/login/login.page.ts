import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from '../util.service';
import { HttpServiceService } from '../http-service.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { authService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  adminLogin=new Subject<boolean>();
  token:any;
  isLoggedIn=false;
  userId:number=0;
  invalidPass:boolean=false;
  loginNotification
  constructor(
    private httpServ:HttpServiceService,
    private http:HttpClient,
    private authSer:authService,
    private router:Router
  ) { }
  ngOnInit(): void {
    this.token=localStorage.getItem('Token')
    this.adminLogin.subscribe((res)=>{
      this.isLoggedIn=res
    })
  }
  submit(data:any){
    this.http.post<any>(`${this.httpServ.testUrl}/login`,data).subscribe(
      (res)=>{console.log(res.data),localStorage.setItem('mobileToken',res.data.token),localStorage.setItem('MobileBID',res.data.id),this.userId=res.data.id
      ,console.log(this.userId)
    },
      (error)=>{
        if(error){
            this.invalidPass=true
            setTimeout(() => {
            this.invalidPass=false
          }, 2000);
        }
      },
      ()=>{
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this.authSer.logIn()
        this.loginNotification=true;
        alert("you have been logged in!")
        setTimeout(() => {
          this.httpServ.userId=this.userId;
          this.router.navigate(['home/men'])
          this.adminLogin.next(this.isLoggedIn)
          this.httpServ.isLoggedIn=this.isLoggedIn;
        }, 2000);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      }
    )

  }
}
