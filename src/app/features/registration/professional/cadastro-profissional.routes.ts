import { Routes } from '@angular/router';
import { CadastroInformacoesGeraisComponent } from './general-info/cadastro-informacoes-gerais.component';
import { EnderecoComponent } from './address/endereco.component';
import { ContatoComponent } from './contact/contato.component';
import { CarreiraComponent } from './career/carreira.component';
import { ExperienciaComponent } from './experience/experiencia.component';
import { EscolaridadeComponent } from './education/escolaridade.component';
import { CadastroComplementoComponent } from './supplemental/cadastro-complemento.component';
import { CadastroContaComponent } from './bank-account/cadastro-conta.component';

export const CADASTRO_PROFISSIONAL_ROUTES: Routes = [
  { path: 'informacoes-gerais', component: CadastroInformacoesGeraisComponent },
  { path: 'endereco',           component: EnderecoComponent },
  { path: 'contato',            component: ContatoComponent },
  { path: 'carreira',           component: CarreiraComponent },
  { path: 'experiencia',        component: ExperienciaComponent },
  { path: 'escolaridade',       component: EscolaridadeComponent },
  { path: 'complemento',        component: CadastroComplementoComponent },
  { path: 'conta',              component: CadastroContaComponent },
];
