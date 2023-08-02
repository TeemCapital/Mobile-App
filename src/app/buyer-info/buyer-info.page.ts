import { Component, OnInit } from '@angular/core';
import { ProductsServiceService } from '../product-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-buyer-info',
  templateUrl: './buyer-info.page.html',
  styleUrls: ['./buyer-info.page.scss'],
})
export class BuyerInfoPage implements OnInit {

  address!:string;
  buyer_email_address!:string;
  buyer_contact_number!:string;
  addressForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private productSer:ProductsServiceService,private router:Router) {}

  ngOnInit() {
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required],
      buyer_email_address: ['', [Validators.required, Validators.email]],
      buyer_contact_number: ['', [Validators.required, Validators.maxLength(13)]],
    });
  }

  getData(){
    this.productSer.address=this.addressForm.value.address
    this.productSer.buyer_contact_number=this.addressForm.value.buyer_contact_number
    this.productSer.buyer_email_address=this.addressForm.value.buyer_email_address
    this.router.navigate([`../payments`])
  }
}
