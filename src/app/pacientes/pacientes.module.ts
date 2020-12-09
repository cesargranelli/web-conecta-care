import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PacientesComponent} from './pacientes.component';
import {PacientesRoutingModule} from './pacientes-routing.module';
import { LoginComponent } from './cadastro/login/login.component';
import { InformacoesGeraisComponent } from './cadastro/informacoes-gerais/informacoes-gerais.component';
import { EnderecoComponent } from './cadastro/endereco/endereco.component';
import { ContatoComponent } from './cadastro/contato/contato.component';
import { ComplementoComponent } from './cadastro/complemento/complemento.component';
import { HistoricoMedicoComponent } from './cadastro/historico-medico/historico-medico.component';

@NgModule({
  declarations: [PacientesComponent, LoginComponent, InformacoesGeraisComponent, EnderecoComponent, ContatoComponent, ComplementoComponent, HistoricoMedicoComponent],
  imports: [
    CommonModule,
    PacientesRoutingModule
  ]
})
export class PacientesModule {
}
