import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './cadastro/homecare/cadastro-homecare.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { InformacoesContatoComponent } from './dados-homecares/contato/informacoes-contato.component';
import { DadosHomecaresComponent } from './dados-homecares/dados-homecares.component';
import { InformacoesEnderecoComponent } from './dados-homecares/endereco/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './dados-homecares/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './dados-homecares/login/informacoes-login.component';
import { HomeCaresComponent } from './homecares.component';

const routes: Routes = [
  { path: 'homecares/:id', component: HomeCaresComponent },
  { path: 'homecares/:id/cadastro/login', component: CadastroLoginComponent },
  { path: 'homecares/:id/cadastro/homecare', component: CadastroHomeCareComponent },
  { path: 'homecares/:id/cadastro/endereco', component: CadastroEnderecoComponent },
  { path: 'homecares/:id/cadastro/contato', component: CadastroContatoComponent },
  { path: 'homecares/:id/dados-homecares', component: DadosHomecaresComponent },
  { path: 'homecares/:id/dados-homecares/login', component: InformacoesLoginComponent },
  { path: 'homecares/:id/dados-homecares/homecare', component: InformacoesHomecareComponent },
  { path: 'homecares/:id/dados-homecares/endereco', component: InformacoesEnderecoComponent },
  { path: 'homecares/:id/dados-homecares/contato', component: InformacoesContatoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeCaresRoutingModule {
}
