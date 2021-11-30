import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { DadosComponent } from '../pacientes/dados/dados.component';
import { LoginComponent } from '../pacientes/dados/login/login.component';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './cadastro/homecare/cadastro-homecare.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosHomecaresComponent } from './dados/dados-homecares.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './dados/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { HomeCaresComponent } from './homecares.component';
import { HomecarePacienteComponent } from './paciente/homecare-paciente.component';
import { HomecareProfissionalComponent } from './profissional/homecare-profissional.component';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { NovoAtendimentoComponent } from './tratamento/atendimento/novo-atendimento/novo-atendimento.component';
import { TratamentoListaEmAbertoComponent } from './tratamento/lista-em-aberto/tratamento-lista-em-aberto.component';
import { TratamentoPreviewComponent } from './tratamento/preview/tratamento-preview.component';
import { SolicitacaoTratamentoComponent } from './tratamento/solicitacao/solicitacao-tratamento.component';
import { TratamentoComponent } from './tratamento/tratamento.component';
import { InformacoesGeraisComponent } from '../pacientes/dados/informacoes-gerais/informacoes-gerais.component';
import { EnderecoComponent } from '../pacientes/dados/endereco/endereco.component';
import { ContatoComponent } from '../pacientes/dados/contato/contato.component';
import { ComplementoComponent } from '../pacientes/dados/complemento/complemento.component';
import { HistoricoMedicoComponent } from '../pacientes/dados/historico-medico/historico-medico.component';

const routes: Routes = [
  {
    path: 'homecares',
    canActivate: [AuthGuard],
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
