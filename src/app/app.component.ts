import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UtilService } from './util.service';
import { menuController } from '@ionic/core';
import { Router } from '@angular/router';
import { HttpServiceService } from './http-service.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { authService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public isMenuEnabled:boolean = true;
  public selectedIndex = 0;
  token=localStorage.getItem('mobileToken')
  BuyerId=localStorage.getItem('MobileBID');
  isLoggedIn=false;
  logoutNotification: boolean=false;
  adminLogin=new Subject<boolean>();
  cartCounter!:number;
  buyerLoggedIn: boolean;


  constructor(
    private platform: Platform,
    private httpClient:HttpClient,
    private httpSer:HttpServiceService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService,
    private router: Router,
    private authSer:authService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    this.selectedIndex = 1;
    
    this.util.getMenuState().subscribe(menuState => {
      this.isMenuEnabled = menuState;
    });
  }

  navigate(path, selectedId) {
    this.selectedIndex = selectedId;
    this.router.navigate([path]);
  }
  men(){
    this.router.navigate(['../home/men'])
  }
  women(){}
  kids(){}

  close() {
    menuController.toggle();
  }
  logout() {
    this.httpClient.post<any>(`${this.httpSer.testUrl}/logout`,this.token).pipe(
      
    ).subscribe(
      (res)=>{
        if(res){
        this.router.navigate(['home/men'])
        }
        console.log(res)
      }
    )
    if(this.token && this.BuyerId){
      localStorage.removeItem('mobileToken');
      localStorage.removeItem('MobileBID');
      this.authSer.logOut();
      this.isLoggedIn=false;
      this.adminLogin.next(this.isLoggedIn)
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      this.logoutNotification=true;
      setTimeout(() => {
          this.logoutNotification=false
          this.buyerLoggedIn=false
          window.location.reload();
      }, 2000);
    }

  }

}
