import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';
import {CadastroInformacoesGeraisComponent} from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import {CadastroEnderecoComponent} from './cadastro/endereco/cadastro-endereco.component';
import {CadastroContatoComponent} from './cadastro/contato/cadastro-contato.component';
import {CadastroComplementoComponent} from './cadastro/complemento/cadastro-complemento.component';
import {CadastroHistoricoMedicoComponent} from './cadastro/historico-medico/cadastro-historico-medico.component';
import {PathPaciente} from "../enums/path-paciente.class";
import {CadastroLoginComponent} from "../cadastro/login/cadastro-login.component";
import {DadosComponent} from "./dados/dados.component";
import {LoginComponent} from "./dados/login/login.component";
import {InformacoesGeraisComponent} from "./dados/informacoes-gerais/informacoes-gerais.component";
import {EnderecoComponent} from "./dados/endereco/endereco.component";
import {ContatoComponent} from "./dados/contato/contato.component";
import {ComplementoComponent} from "./dados/complemento/complemento.component";
import {HistoricoMedicoComponent} from "./dados/historico-medico/historico-medico.component";

const routes: Routes = [
  {
    path: 'pacientes',
    // canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        children: [
          {path: '', component: PacientesComponent},
          {
            path: 'cadastro',
            children: [
              {path: PathPaciente.paciente, component: PacientesComponent},
              {path: PathPaciente.login, component: CadastroLoginComponent},
              {path: PathPaciente.informacoesGerais, component: CadastroInformacoesGeraisComponent},
              {path: PathPaciente.endereco, component: CadastroEnderecoComponent},
              {path: PathPaciente.contato, component: CadastroContatoComponent},
              {path: PathPaciente.complemento, component: CadastroComplementoComponent},
              {path: PathPaciente.historicoMedico, component: CadastroHistoricoMedicoComponent}
            ]
          },
          {
            path: 'dados',
            children: [
              {path: '', component: DadosComponent},
              {path: 'login', component: LoginComponent},
              {path: 'informacoes-gerais', component: InformacoesGeraisComponent},
              {path: 'endereco', component: EnderecoComponent},
              {path: 'contato', component: ContatoComponent},
              {path: 'complemento', component: ComplementoComponent},
              {path: 'historico-medico', component: HistoricoMedicoComponent},
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
