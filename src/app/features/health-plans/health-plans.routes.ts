import { Routes } from '@angular/router';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroPlanoSaudeComponent } from './register/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './details/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './details/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeComponent } from './planos-saude.component';

export const HEALTH_PLANS_ROUTES: Routes = [
  {
    path: ':id',
    children: [
      { path: '', component: PlanosSaudeComponent },
      {
        path: 'register',
        children: [
          { path: 'health-plan', component: CadastroPlanoSaudeComponent },
          { path: 'address', component: CadastroEnderecoComponent },
          { path: 'contact', component: CadastroContatoComponent },
        ],
      },
      {
        path: 'details',
        children: [
          { path: '', component: DadosPlanosSaudeComponent },
          { path: 'login', component: InformacoesLoginComponent },
          { path: 'health-plan', component: InformacoesPlanoSaudeComponent },
          { path: 'address', component: InformacoesEnderecoComponent },
          { path: 'contact', component: InformacoesContatoComponent },
        ],
      },
    ],
  },
];
