import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {InformacoesGeraisComponent} from './cadastro/informacoes-gerais/informacoes-gerais.component';
import {EnderecoComponent} from './cadastro/endereco/endereco.component';
import {ContatoComponent} from './cadastro/contato/contato.component';
import {ComplementoComponent} from './cadastro/complemento/complemento.component';
import {HistoricoMedicoComponent} from './cadastro/historico-medico/historico-medico.component';

const routes: Routes = [
  {path: 'pacientes/:id', component: PacientesComponent},
  {path: 'pacientes/:id/cadastro/login', component: CadastroLoginComponent},
  {path: 'pacientes/:id/cadastro/informacoes-gerais', component: InformacoesGeraisComponent},
  {path: 'pacientes/:id/cadastro/endereco', component: EnderecoComponent},
  {path: 'pacientes/:id/cadastro/contato', component: ContatoComponent},
  {path: 'pacientes/:id/cadastro/complemento', component: ComplementoComponent},
  {path: 'pacientes/:id/cadastro/historico-medico', component: HistoricoMedicoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
