import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadosComponent } from '../pacientes/details/dados.component';
import { LoginComponent } from '../pacientes/details/login/login.component';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './register/homecare/cadastro-homecare.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosHomecaresComponent } from './details/dados-homecares.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './details/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { HomeCaresComponent } from './homecares.component';
import { HomecarePacienteComponent } from './patient/homecare-paciente.component';
import { HomecareProfissionalComponent } from './profissional/homecare-profissional.component';
import { ProntuarioComponent } from './medical-record/prontuario.component';
import { NovoAtendimentoComponent } from './treatment/attendance/novo-atendimento/novo-atendimento.component';
import { TratamentoListaEmAbertoComponent } from './treatment/open-list/tratamento-lista-em-aberto.component';
import { TratamentoPreviewComponent } from './treatment/preview/tratamento-preview.component';
import { SolicitacaoTratamentoComponent } from './treatment/request/solicitacao-tratamento.component';
import { TratamentoComponent } from './treatment/tratamento.component';
import { InformacoesGeraisComponent } from '../pacientes/details/general-info/informacoes-gerais.component';
import { EnderecoComponent } from '../pacientes/details/address/endereco.component';
import { ContatoComponent } from '../pacientes/details/contact/contato.component';
import { ComplementoComponent } from '../pacientes/details/supplemental/complemento.component';
import { HistoricoMedicoComponent } from '../pacientes/details/medical-history/historico-medico.component';

const routes: Routes = [
  {
    path: 'homecares',
    children: [
      {
        path: ':homecare_id',
        children: [
          { path: '', component: HomeCaresComponent },
          {
            path: 'cadastro',
            children: [
              { path: 'homecare', component: CadastroHomeCareComponent },
              { path: 'endereco', component: CadastroEnderecoComponent },
              { path: 'contato', component: CadastroContatoComponent },
            ],
          },
          {
            path: 'dados',
            children: [
              { path: '', component: DadosHomecaresComponent },
              { path: 'login', component: InformacoesLoginComponent },
              { path: 'homecare', component: InformacoesHomecareComponent },
              { path: 'endereco', component: InformacoesEnderecoComponent },
              { path: 'contato', component: InformacoesContatoComponent },
            ],
          },
          {
            path: 'prontuario',
            children: [
              { path: ':prontuario_id', component: ProntuarioComponent }
            ],
          },
          {
            path: 'tratamento',
            children: [
              { path: 'solicitacao', component: SolicitacaoTratamentoComponent },
              {
                path: 'preview',
                component: TratamentoPreviewComponent,
              },
              {
                path: 'em-andamento',
                children: [
                  { path: '', component: TratamentoListaEmAbertoComponent },
                  {
                    path: ':tratamento_id',
                    children: [
                      { path: '', component: TratamentoComponent },
                      { path: 'novo-atendimento', component: NovoAtendimentoComponent }
                    ]
                  }
                ]
              }
            ],
          },
          { path: 'profissional', component: HomecareProfissionalComponent },
          {
            path: 'paciente',
            children: [
              { path: '', component: HomecarePacienteComponent },
              {
                path: ':paciente_id',
                children: [
                  { path: '', component: DadosComponent },
                  { path: 'login', component: LoginComponent },
                  { path: 'informacoes-gerais', component: InformacoesGeraisComponent },
                  { path: 'endereco', component: EnderecoComponent },
                  { path: 'contato', component: ContatoComponent },
                  { path: 'complemento', component: ComplementoComponent },
                  { path: 'historico-medico', component: HistoricoMedicoComponent }
                ]
              }
            ],
          }
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCaresRoutingModule { }
