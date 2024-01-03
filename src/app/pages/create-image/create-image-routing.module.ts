import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateImagePage } from './create-image.page';

const routes: Routes = [
  {
    path: '',
    component: CreateImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateImagePageRoutingModule {}
