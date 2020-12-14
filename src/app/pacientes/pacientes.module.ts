import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PacientesComponent} from './pacientes.component';
import {PacientesRoutingModule} from './pacientes-routing.module';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {CadastroInformacoesGeraisComponent} from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import {CadastroEnderecoComponent} from './cadastro/endereco/cadastro-endereco.component';
import {CadastroContatoComponent} from './cadastro/contato/cadastro-contato.component';
import {CadastroComplementoComponent} from './cadastro/complemento/cadastro-complemento.component';
import {CadastroHistoricoMedicoComponent} from './cadastro/historico-medico/cadastro-historico-medico.component';
import {SharedComponentModule} from '../shared/components/shared-component.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormEnderecoComponent} from './shared/components/forms/endereco/form-endereco.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';

@NgModule({
  declarations: [
    PacientesComponent,
    CadastroLoginComponent,
    CadastroInformacoesGeraisComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    CadastroComplementoComponent,
    CadastroHistoricoMedicoComponent,
    FormEnderecoComponent,
    FormContatoComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PacientesModule {
}
