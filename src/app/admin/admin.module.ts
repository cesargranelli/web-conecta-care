import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AdminRoutingModule } from './admin-routing.module';
import { EventoCadastroComponent } from './eventos/cadastro/evento-cadastro.component';
import { EventosComponent } from './eventos/eventos.component';

@NgModule({
  declarations: [
    EventosComponent,
    EventoCadastroComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxMaskModule
  ]
})
export class AdminModule { }
