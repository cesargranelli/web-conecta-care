import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: 'planos-saude/:id/cadastro/filial', component: CadastroPlanoSaudeFilialComponent },
  { path: 'planos-saude/:id/cadastro/filial/endereco', component: CadastroEnderecoComponent },
  { path: 'planos-saude/:id/cadastro/filial/contato', component: CadastroContatoComponent },
  { path: 'planos-saude/:id/cadastro/filial/login', component: CadastroLoginComponent },
  { path: 'planos-saude-filial/:id', component: PlanosSaudeFilialComponent },
  { path: 'planos-saude-filial/:id/dados', component: DadosPlanosSaudeFilialComponent },
  { path: 'planos-saude-filial/:id/dados/login', component: InformacoesLoginComponent },
  { path: 'planos-saude-filial/:id/dados/filial', component: InformacoesPlanoSaudeFilialComponent },
  { path: 'planos-saude-filial/:id/dados/endereco', component: InformacoesEnderecoComponent },
  { path: 'planos-saude-filial/:id/dados/contato', component: InformacoesContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanosSaudeFilialRoutingModule {
}
