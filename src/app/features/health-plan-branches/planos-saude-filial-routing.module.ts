import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {
    path: 'planos-saude',
    children: [
      {
        path: ':id',
        children: [
          {
            path: 'cadastro',
            children: [
              {
                path: 'filial',
                children: [
                  { path: '', component: CadastroPlanoSaudeFilialComponent },
                  { path: 'endereco', component: CadastroEnderecoComponent },
                  { path: 'contato', component: CadastroContatoComponent },
                  { path: 'login', component: CadastroLoginComponent }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: 'planos-saude-filial',
    children: [
      {
        path: ':id',
        children: [
          { path: '', component: PlanosSaudeFilialComponent },
          {
            path: 'dados',
            children: [
              { path: '', component: DadosPlanosSaudeFilialComponent },
              { path: 'login', component: InformacoesLoginComponent },
              { path: 'filial', component: InformacoesPlanoSaudeFilialComponent },
              { path: 'endereco', component: InformacoesEnderecoComponent },
              { path: 'contato', component: InformacoesContatoComponent }
            ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosSaudeFilialRoutingModule {
}
