import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './register/homecare/cadastro-homecare.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosHomecaresComponent } from './details/dados-homecares.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './details/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { HomeCaresRoutingModule } from './homecares-routing.module';
import { HomeCaresComponent } from './homecares.component';
import { CardAtendimentosComponent } from './shared/components/card-atendimentos/card-atendimentos.component';
import { FormContatoComponent } from './shared/components/forms/contact/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/address/form-endereco.component';
import { FormHomeCareComponent } from './shared/components/forms/homecare/form-homecare.component';
import { ModalCriarTratamentoComponent } from './shared/components/modal/criar-tratamento/modal-criar-tratamento.component';
import { ModalDetalheAtendimentoComponent } from './shared/components/modal/detalhe-atendimento/modal-detalhe-atendimento.component';
import { ProntuarioComponent } from './medical-record/prontuario.component';
import { TratamentoAtendimentoComponent } from './treatment/attendance/atendimento/tratamento-atendimento.component';
import { TratamentoListaAtendimentosComponent } from './treatment/attendance/lista-atendimentos/tratamento-lista-atendimentos.component';
import { NovoAtendimentoComponent } from './treatment/attendance/novo-atendimento/novo-atendimento.component';
import { TratamentoAcompanhanteComponent } from './treatment/components/acompanhante/tratamento-acompanhante.component';
import { TratamentoEnderecoComponent } from './treatment/components/address/tratamento-endereco.component';
import { TratamentoPacienteComponent } from './treatment/components/patient/tratamento-paciente.component';
import { TratamentoProfissionalComponent } from './treatment/components/profissional/tratamento-profissional.component';
import { TratamentoListaEmAbertoComponent } from './treatment/open-list/tratamento-lista-em-aberto.component';
import { TratamentoPreviewComponent } from './treatment/preview/tratamento-preview.component';
import { TratamentoSolicitacaoAcompanhanteComponent } from './treatment/request/components/acompanhante/tratamento-solicitacao-acompanhante.component';
import { TratamentoSolicitacaoEnderecoComponent } from './treatment/request/components/address/tratamento-solicitacao-endereco.component';
import { TratamentoSolicitacaoPacienteComponent } from './treatment/request/components/patient/tratamento-solicitacao-paciente.component';
import { TratamentoSolicitacaoProfissionalComponent } from './treatment/request/components/profissional/tratamento-solicitacao-profissional.component';
import { SolicitacaoTratamentoComponent } from './treatment/request/solicitacao-tratamento.component';
import { TratamentoComponent } from './treatment/tratamento.component';
import { HomecareProfissionalComponent } from './profissional/homecare-profissional.component';
import { HomecarePacienteComponent } from './patient/homecare-paciente.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    HomeCaresComponent,
    CadastroHomeCareComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    DadosHomecaresComponent,
    InformacoesLoginComponent,
    InformacoesContatoComponent,
    InformacoesEnderecoComponent,
    InformacoesHomecareComponent,
    FormHomeCareComponent,
    FormEnderecoComponent,
    FormContatoComponent,
    ModalDetalheAtendimentoComponent,
    ModalCriarTratamentoComponent,
    ProntuarioComponent,
    TratamentoComponent,
    TratamentoPacienteComponent,
    TratamentoEnderecoComponent,
    TratamentoAcompanhanteComponent,
    TratamentoProfissionalComponent,
    TratamentoListaAtendimentosComponent,
    TratamentoAtendimentoComponent,
    SolicitacaoTratamentoComponent,
    TratamentoSolicitacaoPacienteComponent,
    TratamentoSolicitacaoEnderecoComponent,
    TratamentoSolicitacaoAcompanhanteComponent,
    TratamentoSolicitacaoProfissionalComponent,
    CardAtendimentosComponent,
    NovoAtendimentoComponent,
    TratamentoListaEmAbertoComponent,
    TratamentoPreviewComponent,
    HomecareProfissionalComponent,
    HomecarePacienteComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeCaresRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    SharedComponentModule,
    FullCalendarModule,
    NgxLoadingModule.forRoot({})
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeCaresModule { }
