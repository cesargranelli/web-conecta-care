import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CadastroEnderecoComponent} from './cadastro/endereco/cadastro-endereco.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {InformacoesLoginComponent} from './dados/informacoes-login/informacoes-login.component';
import {HomecaresComponent} from './homecares.component';
import {InformacoesGeraisComponent as HomeCaresInformacoesGeraisComponent} from './cadastro/informacoes-gerais/informacoes-gerais.component';
import {ContatoComponent as HomeCaresContatoComponent} from './cadastro/contato/contato.component';
import {DadosHomecaresComponent} from './dados/dados-homecares/dados-homecares.component';

const routes: Routes = [
  {path: 'homecares/:id', component: HomecaresComponent},
  {path: 'homecares/:id/cadastro/login', component: CadastroLoginComponent},
  {path: 'homecares/:id/cadastro/endereco', component: CadastroEnderecoComponent},
  {path: 'homecares/:id/cadastro/contato', component: HomeCaresContatoComponent},
  {path: 'homecares/:id/cadastro/informacoes-gerais', component: HomeCaresInformacoesGeraisComponent},
  {path: 'homecares/:id/dados-homecares', component: DadosHomecaresComponent},
  {path: 'homecares/:id/dados-homecares/informacoes-login', component: InformacoesLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomecaresRoutingModule {
}
