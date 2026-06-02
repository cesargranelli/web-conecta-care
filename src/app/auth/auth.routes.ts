import { Routes } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { LoginAdminComponent } from './containers/login-admin/login-admin.component';
import { ManutencaoSenhaComponent } from './containers/login/manutencao-senha/manutencao-senha.component';
import { EsqueciMinhaSenhaComponent } from './containers/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { NovaSenhaComponent } from './containers/login/nova-senha/nova-senha.component';

export const AUTH_ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/manutencao-senha', component: ManutencaoSenhaComponent },
  { path: 'login/esqueci-minha-senha', component: EsqueciMinhaSenhaComponent },
  { path: 'login/nova-senha/:id', component: NovaSenhaComponent },
  { path: 'admin/login', component: LoginAdminComponent }
];
