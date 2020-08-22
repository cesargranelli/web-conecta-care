import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AdminRoutingModule } from './admin-routing.module';
import { EventoComponent } from './evento/evento.component';

@NgModule({
  declarations: [
    EventoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxMaskModule
  ]
})
export class AdminModule { }
