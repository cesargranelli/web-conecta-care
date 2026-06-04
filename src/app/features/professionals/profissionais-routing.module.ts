import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarreiraComponent } from './profile/career/carreira.component';
import { DadosComplementoComponent } from './profile/supplemental/dados-complemento.component';
import { DadosContaComponent } from './profile/bank-account/dados-conta.component';
import { ContatoComponent } from './profile/contact/contato.component';
import { DadosProfissionaisComponent } from './profile/profile.component';
import { EnderecoComponent } from './profile/address/endereco.component';
import { EscolaridadeComponent } from './profile/education/escolaridade.component';
import { ExperienciaComponent } from './profile/experience/experiencia.component';
import { DadosInformacoesGeraisComponent } from './profile/general-info/dados-informacoes-gerais.component';
import { LoginComponent } from './profile/login/login.component';
import { EventoDetalheComponent } from './events/detail/evento-detalhe.component';
import { EventosComponent } from './events/eventos.component';
import { ProfissionaisComponent } from './profissionais.component';

const routes: Routes = [
  {
    path: 'profissionais',
    children: [
      {
        path: ':id',
        children: [
          { path: '', component: ProfissionaisComponent },
          {
            path: 'dados-profissionais',
            children: [
              { path: '', component: DadosProfissionaisComponent },
              { path: 'login', component: LoginComponent },
              { path: 'informacoes-gerais', component: DadosInformacoesGeraisComponent },
              { path: 'endereco', component: EnderecoComponent },
              { path: 'contato', component: ContatoComponent },
              { path: 'carreira', component: CarreiraComponent },
              { path: 'experiencia', component: ExperienciaComponent },
              { path: 'escolaridade', component: EscolaridadeComponent },
              { path: 'complemento', component: DadosComplementoComponent },
              { path: 'conta', component: DadosContaComponent },
            ]
          },
          {
            path: 'eventos',
            children: [
              { path: '', component: EventosComponent },
              { path: ':idEvento', component: EventoDetalheComponent }
            ]
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionaisRoutingModule {
}
