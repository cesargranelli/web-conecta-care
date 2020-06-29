import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProfissionalComponent } from './components/cadastro/profissional/cadastro-profissional.component';
import { ConnectaComponent } from './components/connecta/connecta.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { InformacoesGeraisComponent } from './components/cadastro/profissional/informacoes-gerais/informacoes-gerais.component';
import { EnderecoComponent } from './components/forms/endereco/endereco.component';
import { CadastroLoginComponent } from './components/cadastro/login/cadastro-login.component';

const routes: Routes = [
  { path: '', component: ConnectaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'cadastro/login', component: CadastroLoginComponent },
  // { path: 'cadastro/profissionais', component: CadastroProfissionalComponent },
  { path: 'cadastro/profissionais/{token}', component: CadastroProfissionalComponent },
  { path: 'cadastro/profissionais/informacoes-gerais', component: InformacoesGeraisComponent, data: {animation: 'HomePage'} },
  { path: 'cadastro/profissionais/endereco', component: EnderecoComponent, data: {animation: 'AboutPage'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
