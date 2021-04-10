import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { CadastroPlanoSaudeFilialComponent } from './cadastro/plano-saude-filial/cadastro-plano-saude-filial.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosPlanosSaudeFilialComponent } from './dados/dados-planos-saude-filial.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { InformacoesPlanoSaudeFilialComponent } from './dados/plano-saude-filial/informacoes-plano-saude-filial.component';
import { PlanosSaudeFilialComponent } from './planos-saude-filial.component';

const routes: Routes = [
  {
    path: 'planos-saude',
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard],
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
