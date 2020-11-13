import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { CadastroPlanoSaudeComponent } from './cadastro/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './dados-planos-saude/contato/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './dados-planos-saude/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './dados-planos-saude/endereco/informacoes-endereco.component';
import { InformacoesLoginComponent } from './dados-planos-saude/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './dados-planos-saude/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeComponent } from './planos-saude.component';

const routes: Routes = [
  {path: 'planos-saude/:id', component: PlanosSaudeComponent},
  {path: 'planos-saude/:id/cadastro/login', component: CadastroLoginComponent},
  {path: 'planos-saude/:id/cadastro/plano-saude', component: CadastroPlanoSaudeComponent},
  {path: 'planos-saude/:id/cadastro/endereco', component: CadastroEnderecoComponent},
  {path: 'planos-saude/:id/cadastro/contato', component: CadastroContatoComponent},
  {path: 'planos-saude/:id/dados-planos-saude', component: DadosPlanosSaudeComponent},
  {path: 'planos-saude/:id/dados-planos-saude/login', component: InformacoesLoginComponent},
  {path: 'planos-saude/:id/dados-planos-saude/convenio', component: InformacoesPlanoSaudeComponent},
  {path: 'planos-saude/:id/dados-planos-saude/endereco', component: InformacoesEnderecoComponent},
  {path: 'planos-saude/:id/dados-planos-saude/contato', component: InformacoesContatoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosSaudeRoutingModule {
}
