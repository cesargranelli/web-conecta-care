import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
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
import { TermoPrivacidadeComponent } from './pages/termo-privacidade/termo-privacidade.component';
import { TermoUsoComponent } from './pages/termo-uso/termo-uso.component';

const routes: Routes = [
  { path: '', component: ConnectaComponent },
  { path: 'confirmacao-nova-senha/:token', component: ConfirmacaoNovaSenhaComponent },
  { path: 'espera-confirmacao-email', component: EsperaConfirmacaoEmailComponent },
  { path: 'termo-e-condicoes-de-uso', component: TermoUsoComponent },
  { path: 'politica-de-privacidade', component: TermoPrivacidadeComponent },
  { path: 'confirmacao-cadastro/:token', component: ConfirmacaoCadastroComponent },
  {
    path: 'cadastro',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profissionais',
        children: [
          {
            path: ':id',
            children: [
              { path: 'informacoes-gerais', component: InformacoesGeraisComponent },
              { path: 'endereco', component: EnderecoComponent },
              { path: 'contato', component: ContatoComponent },
              { path: 'carreira', component: CarreiraComponent },
              { path: 'experiencia', component: ExperienciaComponent },
              { path: 'escolaridade', component: EscolaridadeComponent },
              { path: 'complemento', component: ComplementoComponent },
              { path: 'conta', component: ContaComponent }
            ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
