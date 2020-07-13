import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareaPageRoutingModule } from './tarea-routing.module';

import { TareaPage } from './tarea.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareaPageRoutingModule
  ],
  declarations: [TareaPage]
})
export class TareaPageModule {}
