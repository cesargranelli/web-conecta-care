import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { PrettyStringPipe } from 'src/app/core/utils/pretty-json-to-string.pipe';
import { CadastroComplementoComponent } from './register/supplemental/cadastro-complemento.component';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroDependenteCpfComponent } from './register/dependent-cpf/cadastro-dependente-cpf.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroHistoricoMedicoComponent } from './register/medical-history/cadastro-historico-medico.component';
import { CadastroInformacoesGeraisComponent } from './register/general-info/cadastro-informacoes-gerais.component';
import { ComplementoComponent } from './details/supplemental/complemento.component';
import { ContatoComponent } from './details/contact/contato.component';
import { DadosComponent } from './details/dados.component';
import { EnderecoComponent } from './details/address/endereco.component';
import { HistoricoMedicoComponent } from './details/medical-history/historico-medico.component';
import { InformacoesGeraisComponent } from './details/general-info/informacoes-gerais.component';
import { LoginComponent } from './details/login/login.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { FormComplementoComponent } from './shared/components/forms/supplemental/form-complemento.component';
import { FormContatoComponent } from './shared/components/forms/contact/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/address/form-endereco.component';
import { FormHistoricoMedicoComponent } from './shared/components/forms/medical-history/form-historico-medico.component';
import { FormInformacoesGeraisComponent } from './shared/components/forms/general-info/form-informacoes-gerais.component';
import { QrcodeComponent } from './shared/components/modals/qrcode/qrcode.component';
import { DadosResponsavelDependenteService } from './shared/services/dados-responsavel-dependente.service';

@NgModule({
  declarations: [
    PacientesComponent,
    CadastroInformacoesGeraisComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    CadastroComplementoComponent,
    CadastroHistoricoMedicoComponent,
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
    FormComplementoComponent,
    FormEnderecoComponent,
    QrcodeComponent,
    PrettyStringPipe,
    CadastroDependenteCpfComponent
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    DadosResponsavelDependenteService
  ]
})
export class PacientesModule {
}
