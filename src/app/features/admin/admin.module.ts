import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AdminRoutingModule } from './admin-routing.module';
import { EventoCadastroComponent } from './events/register/evento-cadastro.component';
import { EventoDetalheComponent } from './events/detail/evento-detalhe.component';
import { EventosComponent } from './events/eventos.component';

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
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class AdminModule {
}
