import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroLoginComponent } from './components/cadastro/login/cadastro-login.component';
import { CadastroProfissionalComponent } from './components/cadastro/profissional/cadastro-profissional.component';
import { CarreiraComponent } from './components/cadastro/profissional/carreira/carreira.component';
import { ComplementoComponent } from './components/cadastro/profissional/complemento/complemento.component';
import { EscolaridadeComponent } from './components/cadastro/profissional/escolaridade/escolaridade.component';
import { ExperienciaComponent } from './components/cadastro/profissional/experiencia/experiencia.component';
import { InformacoesGeraisComponent } from './components/cadastro/profissional/informacoes-gerais/informacoes-gerais.component';
import { ConnectaComponent } from './components/connecta/connecta.component';
import { ContaComponent } from './components/forms/conta/conta.component';
import { ContatoComponent } from './components/forms/contato/contato.component';
import { EnderecoComponent } from './components/forms/endereco/endereco.component';
import { ConfirmacaoCadastroComponent } from './components/pages/confirmacao-cadastro/confirmacao-cadastro.component';
import { EsperaConfirmacaoEmailComponent } from './components/pages/espera-confirmacao-email/espera-confirmacao-email.component';

const routes: Routes = [
  { path: '', component: ConnectaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/login', component: CadastroLoginComponent },
  { path: 'espera-confirmacao-email', component: EsperaConfirmacaoEmailComponent },
  { path: 'confirmacao-cadastro/:token', component: ConfirmacaoCadastroComponent },
  { path: 'cadastro/profissionais/{token}', component: CadastroProfissionalComponent },
  { path: 'cadastro/profissionais/:id/informacoes-gerais', component: InformacoesGeraisComponent },
  { path: 'cadastro/profissionais/:id/endereco', component: EnderecoComponent },
  { path: 'cadastro/profissionais/:id/contato', component: ContatoComponent },
  { path: 'cadastro/profissionais/:id/carreira', component: CarreiraComponent },
  { path: 'cadastro/profissionais/:id/experiencia', component: ExperienciaComponent },
  { path: 'cadastro/profissionais/:id/escolaridade', component: EscolaridadeComponent },
  { path: 'cadastro/profissionais/:id/complemento', component: ComplementoComponent },
  { path: 'cadastro/profissionais/:id/conta', component: ContaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
