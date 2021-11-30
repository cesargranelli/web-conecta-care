import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CadastroComplementoComponent } from './cadastro/complemento/cadastro-complemento.component';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHistoricoMedicoComponent } from './cadastro/historico-medico/cadastro-historico-medico.component';
import { CadastroInformacoesGeraisComponent } from './cadastro/informacoes-gerais/cadastro-informacoes-gerais.component';
import { ComplementoComponent } from './dados/complemento/complemento.component';
import { ContatoComponent } from './dados/contato/contato.component';
import { DadosComponent } from './dados/dados.component';
import { EnderecoComponent } from './dados/endereco/endereco.component';
import { HistoricoMedicoComponent } from './dados/historico-medico/historico-medico.component';
import { InformacoesGeraisComponent } from './dados/informacoes-gerais/informacoes-gerais.component';
import { LoginComponent } from './dados/login/login.component';
import { PacientesComponent } from './pacientes.component';

const routes: Routes = [
  {
    path: 'pacientes',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':paciente_id',
        children: [
          { path: '', component: PacientesComponent },
          {
            path: 'cadastro',
            children: [
              // {path: 'login', component: CadastroLoginComponent},
              { path: 'informacoes-gerais', component: CadastroInformacoesGeraisComponent },
              { path: 'endereco', component: CadastroEnderecoComponent },
              { path: 'contato', component: CadastroContatoComponent },
              { path: 'complemento', component: CadastroComplementoComponent },
              { path: 'historico-medico', component: CadastroHistoricoMedicoComponent }
            ]
          },
          {
            path: 'dados',
            children: [
              { path: '', component: DadosComponent },
              { path: 'login', component: LoginComponent },
              { path: 'informacoes-gerais', component: InformacoesGeraisComponent },
              { path: 'endereco', component: EnderecoComponent },
              { path: 'contato', component: ContatoComponent },
              { path: 'complemento', component: ComplementoComponent },
              { path: 'historico-medico', component: HistoricoMedicoComponent },
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
