import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { EventoComponent } from './evento/evento.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    EventoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class AdminModule { }
