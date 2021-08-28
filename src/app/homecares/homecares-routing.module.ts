import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './cadastro/homecare/cadastro-homecare.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosHomecaresComponent } from './dados/dados-homecares.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './dados/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { HomeCaresComponent } from './homecares.component';
import { ProntuarioComponent } from './shared/components/prontuario/prontuario.component';
import { SolicitacaoTratamentoComponent } from './tratamento/solicitacao/solicitacao-tratamento.component';

const routes: Routes = [
  {
    path: 'homecares',
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        children: [
          { path: '', component: HomeCaresComponent },
          {
            path: 'cadastro',
            children: [
              { path: 'homecare', component: CadastroHomeCareComponent },
              { path: 'endereco', component: CadastroEnderecoComponent },
              { path: 'contato', component: CadastroContatoComponent },
            ],
          },
          {
            path: 'dados',
            children: [
              { path: '', component: DadosHomecaresComponent },
              { path: 'login', component: InformacoesLoginComponent },
              { path: 'homecare', component: InformacoesHomecareComponent },
              { path: 'endereco', component: InformacoesEnderecoComponent },
              { path: 'contato', component: InformacoesContatoComponent },
            ],
          },
          {
            path: 'prontuario',
            children: [{ path: ':id', component: ProntuarioComponent }],
          },
          {
            path: 'tratamento',
            children: [
              { path: 'solicitacao', component: SolicitacaoTratamentoComponent }
            ],
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeCaresRoutingModule {}
