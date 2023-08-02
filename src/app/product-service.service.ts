import { ProductsModel, CartModel } from './interface/productsModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Products } from './interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  productData:ProductsModel[]=[];
  cartProduct:Products[]=[];
  favProduct:Products[]=[];
  fetchedProducts:Products[]=[];
  cartItemsCount$: BehaviorSubject<number>=new BehaviorSubject(0);
  deleted$=new Subject<boolean>();
  count:number=1;
  ProductQuantity!:number;
  postedProduct:any;
  totalCartAmount:number=0;
  checkoutData:CartModel[]=[];
  finalCheckOutPrice!:number;
  address!:any;
  buyer_email_address!:string;
  buyer_contact_number!:string;
  public search = new BehaviorSubject<string>("");


}
