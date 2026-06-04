import { Routes } from '@angular/router';
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
import { PacientesComponent } from './pacientes.component';

export const PATIENTS_ROUTES: Routes = [
  { path: 'register-dependent', component: CadastroDependenteCpfComponent },
  {
    path: ':patient_id',
    children: [
      { path: '', component: PacientesComponent },
      {
        path: 'register',
        children: [
          { path: 'general-info', component: CadastroInformacoesGeraisComponent },
          { path: 'address', component: CadastroEnderecoComponent },
          { path: 'contact', component: CadastroContatoComponent },
          { path: 'supplemental', component: CadastroComplementoComponent },
          { path: 'medical-history', component: CadastroHistoricoMedicoComponent },
        ],
      },
      {
        path: 'details',
        children: [
          { path: '', component: DadosComponent },
          { path: 'login', component: LoginComponent },
          { path: 'general-info', component: InformacoesGeraisComponent },
          { path: 'address', component: EnderecoComponent },
          { path: 'contact', component: ContatoComponent },
          { path: 'supplemental', component: ComplementoComponent },
          { path: 'medical-history', component: HistoricoMedicoComponent },
        ],
      },
    ],
  },
];
