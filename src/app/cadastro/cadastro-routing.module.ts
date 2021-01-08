import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from 'src/app/cadastro/cadastro.component';
import { CadastroLoginComponent } from './login/cadastro-login.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: ':modulo/:id/cadastro/login', component: CadastroLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule {
}
