import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroLoginComponent } from './login/cadastro-login.component';

const routes: Routes = [
  { path: ':modulo/:id/cadastro/login', component: CadastroLoginComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule {
}
