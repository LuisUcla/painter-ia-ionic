import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateImagePageRoutingModule } from './create-image-routing.module';

import { CreateImagePage } from './create-image.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateImagePageRoutingModule,
    SharedModule // --> importacion para uso de los componentes header y demas
  ],
  declarations: [CreateImagePage]
})
export class CreateImagePageModule {}
