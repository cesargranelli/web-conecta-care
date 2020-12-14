import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {CadastroInformacoesGeraisComponent} from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import {CadastroEnderecoComponent} from './cadastro/endereco/cadastro-endereco.component';
import {CadastroContatoComponent} from './cadastro/contato/cadastro-contato.component';
import {CadastroComplementoComponent} from './cadastro/complemento/cadastro-complemento.component';
import {CadastroHistoricoMedicoComponent} from './cadastro/historico-medico/cadastro-historico-medico.component';

const routes: Routes = [
  {path: 'pacientes/:id', component: PacientesComponent},
  {path: 'pacientes/:id/cadastro/login', component: CadastroLoginComponent},
  {path: 'pacientes/:id/cadastro/informacoes-gerais', component: CadastroInformacoesGeraisComponent},
  {path: 'pacientes/:id/cadastro/endereco', component: CadastroEnderecoComponent},
  {path: 'pacientes/:id/cadastro/contato', component: CadastroContatoComponent},
  {path: 'pacientes/:id/cadastro/complemento', component: CadastroComplementoComponent},
  {path: 'pacientes/:id/cadastro/historico-medico', component: CadastroHistoricoMedicoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
