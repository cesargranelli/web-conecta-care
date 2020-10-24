import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CarreiraComponent} from './dados-profissionais/carreira/carreira.component';
import {ComplementoComponent} from './dados-profissionais/complemento/complemento.component';
import {ContaComponent} from './dados-profissionais/conta/conta.component';
import {ContatoComponent} from './dados-profissionais/contato/contato.component';
import {DadosProfissionaisComponent} from './dados-profissionais/dados-profissionais.component';
import {EnderecoComponent} from './dados-profissionais/endereco/endereco.component';
import {EscolaridadeComponent} from './dados-profissionais/escolaridade/escolaridade.component';
import {ExperienciaComponent} from './dados-profissionais/experiencia/experiencia.component';
import {InformacoesGeraisComponent} from './dados-profissionais/informacoes-gerais/informacoes-gerais.component';
import {LoginComponent} from './dados-profissionais/login/login.component';
import {EventosComponent} from './eventos/eventos.component';
import {ProfissionaisComponent} from './profissionais.component';
import {EventoDetalheComponent} from './eventos/detalhe/evento-detalhe.component';

const routes: Routes = [
  {path: 'profissionais/:id', component: ProfissionaisComponent},
  {path: 'profissionais/:id/dados-profissionais', component: DadosProfissionaisComponent},
  {path: 'profissionais/:id/dados-profissionais/login', component: LoginComponent},
  {path: 'profissionais/:id/dados-profissionais/informacoes-gerais', component: InformacoesGeraisComponent},
  {path: 'profissionais/:id/dados-profissionais/endereco', component: EnderecoComponent},
  {path: 'profissionais/:id/dados-profissionais/contato', component: ContatoComponent},
  {path: 'profissionais/:id/dados-profissionais/carreira', component: CarreiraComponent},
  {path: 'profissionais/:id/dados-profissionais/experiencia', component: ExperienciaComponent},
  {path: 'profissionais/:id/dados-profissionais/escolaridade', component: EscolaridadeComponent},
  {path: 'profissionais/:id/dados-profissionais/complemento', component: ComplementoComponent},
  {path: 'profissionais/:id/dados-profissionais/conta', component: ContaComponent},
  {path: 'profissionais/:id/eventos', component: EventosComponent},
  {path: 'profissionais/:id/eventos/:idEvento', component: EventoDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionaisRoutingModule {
}
