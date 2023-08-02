import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  public testUrl='http://127.0.0.1:8000/api';
  userId!:number;
  isLoggedIn!:boolean;


  constructor() { 
  }
}
