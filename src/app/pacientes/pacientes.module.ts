import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PacientesComponent} from './pacientes.component';
import {PacientesRoutingModule} from './pacientes-routing.module';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {InformacoesGeraisComponent} from './cadastro/informacoes-gerais/informacoes-gerais.component';
import {EnderecoComponent} from './cadastro/endereco/endereco.component';
import {ContatoComponent} from './cadastro/contato/contato.component';
import {ComplementoComponent} from './cadastro/complemento/complemento.component';
import {HistoricoMedicoComponent} from './cadastro/historico-medico/historico-medico.component';
import {SharedComponentModule} from '../shared/components/shared-component.module';

@NgModule({
  declarations: [
    PacientesComponent,
    CadastroLoginComponent,
    InformacoesGeraisComponent,
    EnderecoComponent,
    ContatoComponent,
    ComplementoComponent,
    HistoricoMedicoComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedComponentModule
  ]
})
export class PacientesModule {
}
