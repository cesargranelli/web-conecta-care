import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroPlanoSaudeComponent } from './cadastro/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './dados/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './dados/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeComponent } from './planos-saude.component';

const routes: Routes = [
  {
    path: 'planos-saude',
    canActivate: [AuthGuard],
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
