import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyerInfoPageRoutingModule } from './buyer-info-routing.module';

import { BuyerInfoPage } from './buyer-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuyerInfoPageRoutingModule
  ],
  declarations: [BuyerInfoPage]
})
export class BuyerInfoPageModule {}
