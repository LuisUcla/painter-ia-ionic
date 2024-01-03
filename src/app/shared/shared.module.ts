import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './templates/header/header.component';
import { PostDetailsComponent } from './templates/post-details/post-details.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PostDetailsComponent
  ],
  imports: [
    CommonModule,
    IonicModule, // para los componentes de ionic
    ReactiveFormsModule, // --> para usar los formularios reactivos
    RouterModule // --> para usar las rutas y modulos de las rutas.
  ],
  exports: [
    ReactiveFormsModule, // --> se exporta para ser usado en los demas moduloss
    HeaderComponent,
    PostDetailsComponent
  ]
})
export class SharedModule { }
