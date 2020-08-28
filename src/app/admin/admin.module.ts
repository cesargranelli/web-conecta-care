import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AdminRoutingModule } from './admin-routing.module';
import { EventoCadastroComponent } from './eventos/cadastro/evento-cadastro.component';
import { EventoDetalheComponent } from './eventos/detalhe/evento-detalhe.component';
import { EventosComponent } from './eventos/eventos.component';

@NgModule({
  declarations: [
    EventosComponent,
    EventoCadastroComponent,
    EventoDetalheComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    NgxMaskModule
  ]
})
export class AdminModule { }
