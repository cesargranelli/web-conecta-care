import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComplementoComponent } from './register/supplemental/cadastro-complemento.component';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroDependenteCpfComponent } from './register/dependent-cpf/cadastro-dependente-cpf.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroHistoricoMedicoComponent } from './register/medical-history/cadastro-historico-medico.component';
import { CadastroInformacoesGeraisComponent } from './register/general-info/cadastro-informacoes-gerais.component';
import { ComplementoComponent } from './details/supplemental/complemento.component';
import { ContatoComponent } from './details/contact/contato.component';
import { DadosComponent } from './details/dados.component';
import { EnderecoComponent } from './details/address/endereco.component';
import { HistoricoMedicoComponent } from './details/medical-history/historico-medico.component';
import { InformacoesGeraisComponent } from './details/general-info/informacoes-gerais.component';
import { LoginComponent } from './details/login/login.component';
import { PacientesComponent } from './pacientes.component';

const routes: Routes = [
  {
    path: 'pacientes',
    children: [
      {
        path: '',
        children: [
          { path: 'cadastro-dependente-cpf', component: CadastroDependenteCpfComponent },
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
