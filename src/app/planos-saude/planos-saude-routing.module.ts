import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: 'planos-saude/:id', component: PlanosSaudeComponent },
  { path: 'planos-saude/:id/cadastro/plano-saude', component: CadastroPlanoSaudeComponent },
  { path: 'planos-saude/:id/cadastro/endereco', component: CadastroEnderecoComponent },
  { path: 'planos-saude/:id/cadastro/contato', component: CadastroContatoComponent },
  { path: 'planos-saude/:id/dados', component: DadosPlanosSaudeComponent },
  { path: 'planos-saude/:id/dados/login', component: InformacoesLoginComponent },
  { path: 'planos-saude/:id/dados/plano-saude', component: InformacoesPlanoSaudeComponent },
  { path: 'planos-saude/:id/dados/endereco', component: InformacoesEnderecoComponent },
  { path: 'planos-saude/:id/dados/contato', component: InformacoesContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosSaudeRoutingModule {
}
