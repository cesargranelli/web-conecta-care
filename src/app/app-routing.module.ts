import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarreiraComponent } from './components/cadastro/profissional/carreira/carreira.component';
import { ComplementoComponent } from './components/cadastro/profissional/complemento/complemento.component';
import { ContaComponent } from './components/cadastro/profissional/conta/conta.component';
import { ContatoComponent } from './components/cadastro/profissional/contato/contato.component';
import { EnderecoComponent } from './components/cadastro/profissional/endereco/endereco.component';
import { EscolaridadeComponent } from './components/cadastro/profissional/escolaridade/escolaridade.component';
import { ExperienciaComponent } from './components/cadastro/profissional/experiencia/experiencia.component';
import { InformacoesGeraisComponent } from './components/cadastro/profissional/informacoes-gerais/informacoes-gerais.component';
import { ConnectaComponent } from './components/connecta/connecta.component';
import { ConfirmacaoCadastroComponent } from './pages/confirmacao-cadastro/confirmacao-cadastro.component';
import { ConfirmacaoNovaSenhaComponent } from './pages/confirmacao-nova-senha/confirmacao-nova-senha.component';
import { EsperaConfirmacaoEmailComponent } from './pages/espera-confirmacao-email/espera-confirmacao-email.component';
import { TermoUsoComponent } from './pages/termo-uso/termo-uso.component';

const routes: Routes = [
  {path: '', component: ConnectaComponent},
  {path: 'confirmacao-nova-senha/:token', component: ConfirmacaoNovaSenhaComponent},
  {path: 'espera-confirmacao-email', component: EsperaConfirmacaoEmailComponent},
  {path: 'termo-e-condicoes-de-uso', component: TermoUsoComponent},
  {path: 'confirmacao-cadastro/:token', component: ConfirmacaoCadastroComponent},
  {path: 'cadastro/profissionais/:id/informacoes-gerais', component: InformacoesGeraisComponent},
  {path: 'cadastro/profissionais/:id/endereco', component: EnderecoComponent},
  {path: 'cadastro/profissionais/:id/contato', component: ContatoComponent},
  {path: 'cadastro/profissionais/:id/carreira', component: CarreiraComponent},
  {path: 'cadastro/profissionais/:id/experiencia', component: ExperienciaComponent},
  {path: 'cadastro/profissionais/:id/escolaridade', component: EscolaridadeComponent},
  {path: 'cadastro/profissionais/:id/complemento', component: ComplementoComponent},
  {path: 'cadastro/profissionais/:id/conta', component: ContaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
