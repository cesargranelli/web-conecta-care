import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CarreiraComponent } from './dados-profissionais/carreira/carreira.component';
import { DadosComplementoComponent } from './dados-profissionais/complemento/dados-complemento.component';
import { DadosContaComponent } from './dados-profissionais/conta/dados-conta.component';
import { ContatoComponent } from './dados-profissionais/contato/contato.component';
import { DadosProfissionaisComponent } from './dados-profissionais/dados-profissionais.component';
import { EnderecoComponent } from './dados-profissionais/endereco/endereco.component';
import { EscolaridadeComponent } from './dados-profissionais/escolaridade/escolaridade.component';
import { ExperienciaComponent } from './dados-profissionais/experiencia/experiencia.component';
import { DadosInformacoesGeraisComponent } from './dados-profissionais/informacoes-gerais/dados-informacoes-gerais.component';
import { LoginComponent } from './dados-profissionais/login/login.component';
import { EventoDetalheComponent } from './eventos/detalhe/evento-detalhe.component';
import { EventosComponent } from './eventos/eventos.component';
import { ProfissionaisComponent } from './profissionais.component';

const routes: Routes = [
  {
    path: 'profissionais',
    canActivate: [AuthGuard],
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
