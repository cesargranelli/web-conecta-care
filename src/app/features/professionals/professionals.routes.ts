import { Routes } from '@angular/router';
import { CarreiraComponent } from './profile/career/carreira.component';
import { DadosComplementoComponent } from './profile/supplemental/dados-complemento.component';
import { DadosContaComponent } from './profile/bank-account/dados-conta.component';
import { ContatoComponent } from './profile/contact/contato.component';
import { DadosProfissionaisComponent } from './profile/dados-profissionais.component';
import { EnderecoComponent } from './profile/address/endereco.component';
import { EscolaridadeComponent } from './profile/education/escolaridade.component';
import { ExperienciaComponent } from './profile/experience/experiencia.component';
import { DadosInformacoesGeraisComponent } from './profile/general-info/dados-informacoes-gerais.component';
import { LoginComponent } from './profile/login/login.component';
import { EventoDetalheComponent } from './events/detail/evento-detalhe.component';
import { EventosComponent } from './events/eventos.component';
import { ProfissionaisComponent } from './profissionais.component';

export const PROFESSIONALS_ROUTES: Routes = [
  {
    path: ':id',
    children: [
      { path: '', component: ProfissionaisComponent },
      {
        path: 'professional-data',
        children: [
          { path: '', component: DadosProfissionaisComponent },
          { path: 'login', component: LoginComponent },
          { path: 'general-info', component: DadosInformacoesGeraisComponent },
          { path: 'address', component: EnderecoComponent },
          { path: 'contact', component: ContatoComponent },
          { path: 'career', component: CarreiraComponent },
          { path: 'experience', component: ExperienciaComponent },
          { path: 'education', component: EscolaridadeComponent },
          { path: 'complement', component: DadosComplementoComponent },
          { path: 'account', component: DadosContaComponent },
        ],
      },
      {
        path: 'events',
        children: [
          { path: '', component: EventosComponent },
          { path: ':eventId', component: EventoDetalheComponent },
        ],
      },
    ],
  },
];
