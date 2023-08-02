import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpServiceService } from '../http-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  url: string;
  spinner:boolean=true;
  products: any=[];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private httpServ:HttpServiceService

  ) { }

  ngOnInit(): void {
    this.url = this.router.url;
    if (this.url.includes("/men")) {
      this.http.get<any>(`${this.httpServ.testUrl}/show`)
        .subscribe((res) => {
          this.products = res;
          this.spinner=false
        });
    }
    if (this.url.includes('/women')) {
      this.http.get<any>(`${this.httpServ.testUrl}/showWomenProducts`).subscribe((res) => {
        this.products = res;
        this.spinner=false

      });
    }
    if (this.url.includes('/kids')) {
      this.http.get<any>(`${this.httpServ.testUrl}/showKidsProducts`).subscribe((res) => {
        this.products = res;
        this.spinner=false

      });
    }
  }
// this.http.get<any>(`${this.httpServ.testUrl}/show`).subscribe(
//   (res)=>{
//     this.products=res;
//     this.spinner=false;
    
//   }
// )
  // Add the setBooleantofalse() function here if it's defined elsewhere in your original code
  }

