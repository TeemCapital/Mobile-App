import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { ItemDetailsPage } from './item-details.page';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {path: '',component: ItemDetailsPage,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemDetailsPageRoutingModule {}
