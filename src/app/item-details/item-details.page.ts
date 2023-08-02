import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { ActionSequence } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../http-service.service';
import { ProductsServiceService } from '../product-service.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  productid:any;
  products:any[]=[]
  quantity:any=1;
  buyerId:any=localStorage.getItem('MobileBID')
  cart:boolean=false;
  favNoti:boolean=false;
  disableDecrement:boolean=false;
  constructor(
    private activatedroute:ActivatedRoute,
    private http:HttpClient,
    private httpServ:HttpServiceService,
    private prodServ:ProductsServiceService
  ) { }

  ngOnInit(): void {
      this.activatedroute.paramMap.subscribe((param)=>{
        this.productid=param.get('id')
        this.http.get<any>(`${this.httpServ.testUrl}/show/`+this.productid).subscribe(
          (res)=>{this.products.push(res)}
          )
          console.log(this.products)
      })
  }
  increment(){
    this.quantity=this.quantity+1
    console.log(this.quantity)
    if(this.quantity > 1){
      this.disableDecrement=true
    }
  }
  decrement(){
    this.quantity=this.quantity-1
    if(this.quantity < 2){
      this.disableDecrement=false;
    }
  
  }
  AddtoCart(data:any){
    this.prodServ.deleted$.next(true);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.cart=true
    this.products[0].quantity=this.quantity;
    this.http.post<any>(`${this.httpServ.testUrl}/cart`,{...this.products[0],user_id:+this.buyerId}).subscribe((res)=>(console
      .log(res)))
    console.log(this.prodServ.cartProduct)
    this.http.get<number>(`${this.httpServ.testUrl}/getProductCount`).subscribe(
      res=>{
        let count=res;
        this.prodServ.cartItemsCount$.next((count));
      }
    )
    setTimeout(() => {
      this.cart=false
    }, 3000);
  }

  Addtofav(){
  this.http.post<any>(`${this.httpServ.testUrl}/addToFavourites`,{...this.products[0],user_id:this.buyerId}).pipe(
  ).subscribe(
    (res)=>{
      console.log(res)
    },
    ()=>{
      this.favNoti=true
      setTimeout(() => {
          this.favNoti=false;
      }, 2000);
    }

  )
}

  // segmentChanged(e: any) {
  //   this.activeVariation = e.detail.value;

  //   if (this.activeVariation == 'color') {
  //     this.animatioCntrl.create()
  //     .addElement(document.querySelector('.sizes'))
  //     .duration(500)
  //     .iterations(1)
  //     .fromTo('transform', 'translateX(0px)', 'translateX(100%)')
  //     .fromTo('opacity', '1', '0.2')
  //     .play();

  //     this.animatioCntrl.create()
  //     .addElement(document.querySelector('.colors'))
  //     .duration(500)
  //     .iterations(1)
  //     .fromTo('transform', 'translateX(-100%)', 'translateX(0)')
  //     .fromTo('opacity', '0.2', '1')
  //     .play();
  //   } else {
  //     this.animatioCntrl.create()
  //     .addElement(document.querySelector('.sizes'))
  //     .duration(500)
  //     .iterations(1)
  //     .fromTo('transform', 'translateX(100%)', 'translateX(0)')
  //     .fromTo('opacity', '0.2', '1')
  //     .play();

  //     this.animatioCntrl.create()
  //     .addElement(document.querySelector('.colors'))
  //     .duration(500)
  //     .iterations(1)
  //     .fromTo('transform', 'translateX(0px)', 'translateX(-100%)')
  //     .fromTo('opacity', '1', '0.2')
  //     .play();
  //   }
  // }

  // changeSize(size: number) {
  //   this.selectedSize = size;
  // }

  // changeColor(color: number) {
  //   this.selectedColor = color;
  // }

}
