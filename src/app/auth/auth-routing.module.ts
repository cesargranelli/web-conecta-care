import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './containers/login-admin/login-admin.component';
import { EsqueciMinhaSenhaComponent } from './containers/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './containers/login/login.component';
import { ManutencaoSenhaComponent } from './containers/login/manutencao-senha/manutencao-senha.component';
import { NovaSenhaComponent } from './containers/login/nova-senha/nova-senha.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [] },
  { path: 'login', component: LoginComponent, canActivate: [] },
  { path: 'login/manutencao-senha', component: ManutencaoSenhaComponent },
  { path: 'login/esqueci-minha-senha', component: EsqueciMinhaSenhaComponent },
  { path: 'login/nova-senha/:id', component: NovaSenhaComponent },
  { path: 'admin/login', component: LoginAdminComponent, canActivate: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
