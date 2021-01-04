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
import {NgxMaskModule} from 'ngx-mask';
import { DadosComponent } from './dados/dados.component';
import { ComplementoComponent } from './dados/complemento/complemento.component';
import { ContatoComponent } from './dados/contato/contato.component';
import { EnderecoComponent } from './dados/endereco/endereco.component';
import { HistoricoMedicoComponent } from './dados/historico-medico/historico-medico.component';
import { InformacoesGeraisComponent } from './dados/informacoes-gerais/informacoes-gerais.component';
import { LoginComponent } from './dados/login/login.component';
import { FormInformacoesGeraisComponent } from './shared/components/forms/informacoes-gerais/form-informacoes-gerais.component';
import { FormHistoricoMedicoComponent } from './shared/components/forms/historico-medico/form-historico-medico.component';
import { FormComplementoComponent } from './shared/components/forms/complemento/form-complemento.component';

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
    FormContatoComponent,
    DadosComponent,
    ComplementoComponent,
    ContatoComponent,
    EnderecoComponent,
    HistoricoMedicoComponent,
    InformacoesGeraisComponent,
    LoginComponent,
    FormInformacoesGeraisComponent,
    FormHistoricoMedicoComponent,
    FormComplementoComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule
  ]
})
export class PacientesModule {
}
