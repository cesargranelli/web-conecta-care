import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdminComponent } from './containers/login-admin/login-admin.component';
import { EsqueciMinhaSenhaComponent } from './containers/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './containers/login/login.component';
import { ManutencaoSenhaComponent } from './containers/login/manutencao-senha/manutencao-senha.component';
import { NovaSenhaComponent } from './containers/login/nova-senha/nova-senha.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  },
  { path: 'login/manutencao-senha', component: ManutencaoSenhaComponent },
  { path: 'login/esqueci-minha-senha', component: EsqueciMinhaSenhaComponent },
  { path: 'login/nova-senha/:id', component: NovaSenhaComponent },
  { path: 'admin/login', component: LoginAdminComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
