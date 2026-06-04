import { Routes } from '@angular/router';
import { CadastroInformacoesGeraisComponent } from './informacoes-gerais/cadastro-informacoes-gerais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { ContatoComponent } from './contato/contato.component';
import { CarreiraComponent } from './carreira/carreira.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { EscolaridadeComponent } from './escolaridade/escolaridade.component';
import { CadastroComplementoComponent } from './complemento/cadastro-complemento.component';
import { CadastroContaComponent } from './conta/cadastro-conta.component';

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
