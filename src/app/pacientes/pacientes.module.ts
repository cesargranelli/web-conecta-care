import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { NgxMaskModule } from 'ngx-mask';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { PrettyStringPipe } from '../utils/pretty-json-to-string.pipe';
import { CadastroComplementoComponent } from './cadastro/complemento/cadastro-complemento.component';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHistoricoMedicoComponent } from './cadastro/historico-medico/cadastro-historico-medico.component';
import { CadastroInformacoesGeraisComponent } from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import { ComplementoComponent } from './dados/complemento/complemento.component';
import { ContatoComponent } from './dados/contato/contato.component';
import { DadosComponent } from './dados/dados.component';
import { EnderecoComponent } from './dados/endereco/endereco.component';
import { HistoricoMedicoComponent } from './dados/historico-medico/historico-medico.component';
import { InformacoesGeraisComponent } from './dados/informacoes-gerais/informacoes-gerais.component';
import { LoginComponent } from './dados/login/login.component';
import { PacientesRoutingModule } from './pacientes-routing.module';
import { PacientesComponent } from './pacientes.component';
import { CardVerDadosComponent } from './shared/components/card-ver-dados/card-ver-dados.component';
import { FormComplementoComponent } from './shared/components/forms/complemento/form-complemento.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/endereco/form-endereco.component';
import { FormHistoricoMedicoComponent } from './shared/components/forms/historico-medico/form-historico-medico.component';
import { FormInformacoesGeraisComponent } from './shared/components/forms/informacoes-gerais/form-informacoes-gerais.component';
import { QrcodeComponent } from './shared/components/modals/qrcode/qrcode.component';
import { DadosResponsavelDependenteService as DadosResponsavelDependenteService } from './shared/services/dados-responsavel-dependente.service';

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
    CardVerDadosComponent,
    QrcodeComponent,
    PrettyStringPipe
  ],
  imports: [
    CommonModule,
    PacientesRoutingModule,
    SharedComponentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgxQRCodeModule
  ],
  providers: [
    DadosResponsavelDependenteService
  ]
})
export class PacientesModule {
}
