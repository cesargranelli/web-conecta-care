import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroProfissionalComponent } from './views/cadastro/profissional/cadastro-profissional.component';
import { ConnectaComponent } from './views/connecta/connecta.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  { path: '', component: ConnectaComponent },
  { path: 'cadastro', component: SigninComponent },
  { path: 'cadastro-profissional', component: CadastroProfissionalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
