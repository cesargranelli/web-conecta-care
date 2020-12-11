import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {InformacoesGeraisComponent} from './cadastro/informacoes-gerais/informacoes-gerais.component';

const routes: Routes = [
  {path: 'pacientes/:id', component: PacientesComponent},
  {path: 'pacientes/:id/cadastro/login', component: CadastroLoginComponent},
  {path: 'pacientes/:id/cadastro/informacoes-gerais', component: InformacoesGeraisComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
