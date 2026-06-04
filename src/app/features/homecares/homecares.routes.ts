import { Routes } from '@angular/router';
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
import { HomecareProfissionalComponent } from './professional/homecare-profissional.component';
import { ProntuarioComponent } from './medical-record/prontuario.component';
import { NovoAtendimentoComponent } from './treatment/attendance/novo-atendimento/novo-atendimento.component';
import { TratamentoListaEmAbertoComponent } from './treatment/open-list/tratamento-lista-em-aberto.component';
import { TratamentoPreviewComponent } from './treatment/preview/tratamento-preview.component';
import { SolicitacaoTratamentoComponent } from './treatment/request/solicitacao-tratamento.component';
import { TratamentoComponent } from './treatment/tratamento.component';

export const HOMECARES_ROUTES: Routes = [
  {
    path: ':homecare_id',
    children: [
      { path: '', component: HomeCaresComponent },
      {
        path: 'register',
        children: [
          { path: 'homecare', component: CadastroHomeCareComponent },
          { path: 'address', component: CadastroEnderecoComponent },
          { path: 'contact', component: CadastroContatoComponent },
        ],
      },
      {
        path: 'details',
        children: [
          { path: '', component: DadosHomecaresComponent },
          { path: 'login', component: InformacoesLoginComponent },
          { path: 'homecare', component: InformacoesHomecareComponent },
          { path: 'address', component: InformacoesEnderecoComponent },
          { path: 'contact', component: InformacoesContatoComponent },
        ],
      },
      {
        path: 'medical-record/:record_id',
        component: ProntuarioComponent,
      },
      {
        path: 'treatment',
        children: [
          { path: 'request', component: SolicitacaoTratamentoComponent },
          { path: 'preview', component: TratamentoPreviewComponent },
          {
            path: 'in-progress',
            children: [
              { path: '', component: TratamentoListaEmAbertoComponent },
              {
                path: ':treatment_id',
                children: [
                  { path: '', component: TratamentoComponent },
                  { path: 'new-attendance', component: NovoAtendimentoComponent },
                ],
              },
            ],
          },
        ],
      },
      { path: 'professional', component: HomecareProfissionalComponent },
      { path: 'patient', component: HomecarePacienteComponent },
    ],
  },
];
