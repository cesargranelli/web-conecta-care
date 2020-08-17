import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarreiraComponent} from './dados-profissionais/carreira/carreira.component';
import {ComplementoComponent} from './dados-profissionais/complemento/complemento.component';
import {ContaComponent} from './dados-profissionais/conta/conta.component';
import {ContatoComponent} from './dados-profissionais/contato/contato.component';
import {EnderecoComponent} from './dados-profissionais/endereco/endereco.component';
import {EscolaridadeComponent} from './dados-profissionais/escolaridade/escolaridade.component';
import {ExperienciaComponent} from './dados-profissionais/experiencia/experiencia.component';
import {LoginComponent} from './dados-profissionais/login/login.component';
import {ProfissionaisComponent} from './profissionais.component';
import {InformacoesGeraisComponent} from './dados-profissionais/informacoes-gerais/informacoes-gerais.component';

const routes: Routes = [
  {path: 'profissionais/:id', component: ProfissionaisComponent},
  {path: 'profissionais/:id/login', component: LoginComponent},
  {path: 'profissionais/:id/informacoes-gerais', component: InformacoesGeraisComponent},
  {path: 'profissionais/:id/endereco', component: EnderecoComponent},
  {path: 'profissionais/:id/contato', component: ContatoComponent},
  {path: 'profissionais/:id/carreira', component: CarreiraComponent},
  {path: 'profissionais/:id/experiencia', component: ExperienciaComponent},
  {path: 'profissionais/:id/escolaridade', component: EscolaridadeComponent},
  {path: 'profissionais/:id/complemento', component: ComplementoComponent},
  {path: 'profissionais/:id/conta', component: ContaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionaisRoutingModule {
}
