import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartModel, ProductsModel } from '../interface/productsModel';
import { ProductsServiceService } from '../product-service.service';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { authService } from '../auth.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit,OnDestroy {

  productData:ProductsModel[]=[];
  MenproductData:CartModel[]=[];
  cartData:any;
  Productquantity!:number;
  finalAmount:number=0;
  buyerId:any=localStorage.getItem('MobileBID');
  checkOutNotification:boolean=false;

  loadingData:boolean=true;
  constructor(private prodServ:ProductsServiceService,private router:Router,private http:HttpClient, private httpServ:HttpServiceService,private authSer:authService) { }

  ngOnInit(): void {
    console.log("The result is"+this.authSer.loggedIn);
    this.http.get<any>(`${this.httpServ.testUrl}/buyer/${this.buyerId}/products`).subscribe(
        (res)=>{this.MenproductData.push(...res)
        console.log(this.MenproductData)
        this.MenproductData.forEach(element => {
        this.finalAmount=this.finalAmount+element.totalPrice;
      }); }
    )
  }
  delete(i:number,productData:any){
    this.MenproductData.splice(i,1)
    this.http.delete(`${this.httpServ.testUrl}/delete/`+productData.id).subscribe((res)=>{
      this.prodServ.deleted$.next(true);

  })

    // this.prodServ.cartProduct=this.MenproductData;


  }
  // checkOut(){
  //   this.router.navigate([`${this.userId}/payments`])
  // }
ngOnDestroy(): void {
    this.finalAmount=0;
}

}
