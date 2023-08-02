import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.page.html',
  styleUrls: ['./favorite.page.scss'],
})
export class FavoritePage implements OnInit {

  buyerId:any=localStorage.getItem("MobileBID")
  favourites!:any[];
  deleteNoti:boolean=false;
  constructor(private httpClient:HttpClient,private httpSer:HttpServiceService) { }

  ngOnInit(): void {
    this.httpClient.get<any>(`${this.httpSer.testUrl}/${this.buyerId}/showFavourites`).subscribe(
      (res)=>{this.favourites=res,console.log(this.favourites)}
    )

  }
  delete(i:number,product:any){
    this.favourites.splice(i,1)
    this.httpClient.delete<any>(`${this.httpSer.testUrl}/${product.id}/deleteFav`).subscribe(
      (res)=>{
        if(res){
          this.deleteNoti=true
          setTimeout(() => {
            this.deleteNoti=false;
          }, 2000);
        }
      }
    )
  }

}
