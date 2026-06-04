import { Routes } from '@angular/router';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroLoginComponent } from './register/login/cadastro-login.component';
import { CadastroPlanoSaudeFilialComponent } from './register/plano-saude-filial/cadastro-plano-saude-filial.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosPlanosSaudeFilialComponent } from './details/dados-planos-saude-filial.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { InformacoesPlanoSaudeFilialComponent } from './details/plano-saude-filial/informacoes-plano-saude-filial.component';
import { PlanosSaudeFilialComponent } from './planos-saude-filial.component';

export const HEALTH_PLAN_BRANCHES_ROUTES: Routes = [
  {
    path: ':id',
    children: [
      { path: '', component: PlanosSaudeFilialComponent },
      {
        path: 'register',
        children: [
          { path: 'branch', component: CadastroPlanoSaudeFilialComponent },
          { path: 'address', component: CadastroEnderecoComponent },
          { path: 'contact', component: CadastroContatoComponent },
          { path: 'login', component: CadastroLoginComponent },
        ],
      },
      {
        path: 'details',
        children: [
          { path: '', component: DadosPlanosSaudeFilialComponent },
          { path: 'login', component: InformacoesLoginComponent },
          { path: 'branch', component: InformacoesPlanoSaudeFilialComponent },
          { path: 'address', component: InformacoesEnderecoComponent },
          { path: 'contact', component: InformacoesContatoComponent },
        ],
      },
    ],
  },
];
