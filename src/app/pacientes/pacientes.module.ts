import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { CadastroComplementoComponent } from './cadastro/complemento/cadastro-complemento.component';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHistoricoMedicoComponent } from './cadastro/historico-medico/cadastro-historico-medico.component';
import { CadastroInformacoesGeraisComponent } from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/endereco/form-endereco.component';

@NgModule({
  declarations: [
    PacientesComponent,
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
    ReactiveFormsModule,
    NgxMaskModule
  ]
})
export class PacientesModule {
}
