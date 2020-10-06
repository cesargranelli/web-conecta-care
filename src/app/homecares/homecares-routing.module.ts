import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './cadastro/contato/contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './cadastro/homecare/cadastro-homecare.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { InformacoesGeraisComponent } from './dados/informacoes-gerais/informacoes-gerais.component';
import { InformacoesLoginComponent } from './dados/informacoes-login/informacoes-login.component';
import { HomeCaresComponent } from './homecares.component';

const routes: Routes = [
  { path: 'homecares/:id', component: HomeCaresComponent },
  { path: 'homecares/:id/cadastro/login', component: CadastroLoginComponent },
  { path: 'homecares/:id/cadastro/homecare', component: CadastroHomeCareComponent },
  { path: 'homecares/:id/cadastro/endereco', component: CadastroEnderecoComponent },
  { path: 'homecares/:id/informacoes-login', component: InformacoesLoginComponent },
  { path: 'homecares/:id/informacoes-gerais', component: InformacoesGeraisComponent },
  { path: 'homecares/contato', component: ContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeCaresRoutingModule {
}
