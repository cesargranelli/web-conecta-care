import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroPlanoSaudeComponent } from './register/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './details/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './details/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeComponent } from './planos-saude.component';

const routes: Routes = [
  {
    path: 'planos-saude',
    children: [
      {
        path: ':id',
        children: [
          { path: '', component: PlanosSaudeComponent },
          {
            path: 'cadastro',
            children: [
              { path: 'plano-saude', component: CadastroPlanoSaudeComponent },
              { path: 'endereco', component: CadastroEnderecoComponent },
              { path: 'contato', component: CadastroContatoComponent },
            ]
          },
          {
            path: 'dados',
            children: [
              { path: '', component: DadosPlanosSaudeComponent },
              { path: 'login', component: InformacoesLoginComponent },
              { path: 'plano-saude', component: InformacoesPlanoSaudeComponent },
              { path: 'endereco', component: InformacoesEnderecoComponent },
              { path: 'contato', component: InformacoesContatoComponent }
            ]
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosSaudeRoutingModule {
}
