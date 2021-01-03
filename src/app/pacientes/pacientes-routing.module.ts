import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {CadastroInformacoesGeraisComponent} from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import {CadastroEnderecoComponent} from './cadastro/endereco/cadastro-endereco.component';
import {CadastroContatoComponent} from './cadastro/contato/cadastro-contato.component';
import {CadastroComplementoComponent} from './cadastro/complemento/cadastro-complemento.component';
import {CadastroHistoricoMedicoComponent} from './cadastro/historico-medico/cadastro-historico-medico.component';
import {PathPaciente} from "../enums/path-paciente.class";

const routes: Routes = [
  {path: PathPaciente.paciente, component: PacientesComponent},
  {path: PathPaciente.cadastro, component: CadastroLoginComponent},
  {path: PathPaciente.informacoesGerais, component: CadastroInformacoesGeraisComponent},
  {path: PathPaciente.endereco, component: CadastroEnderecoComponent},
  {path: PathPaciente.contato, component: CadastroContatoComponent},
  {path: PathPaciente.complemento, component: CadastroComplementoComponent},
  {path: PathPaciente.historicoMedico, component: CadastroHistoricoMedicoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
