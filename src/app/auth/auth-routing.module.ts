import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsqueciMinhaSenhaComponent } from './login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './login/login.component';
import { NovaSenhaComponent } from './login/nova-senha/nova-senha.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'login/esqueci-minha-senha', component: EsqueciMinhaSenhaComponent },
  { path: 'login/nova-senha/:id', component: NovaSenhaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
