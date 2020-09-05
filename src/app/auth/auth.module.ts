import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginAdminComponent } from './containers/login-admin/login-admin.component';
import { EsqueciMinhaSenhaComponent } from './containers/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './containers/login/login.component';
import { ManutencaoSenhaComponent } from './containers/login/manutencao-senha/manutencao-senha.component';
import { NovaSenhaComponent } from './containers/login/nova-senha/nova-senha.component';

@NgModule({
  declarations: [
    LoginComponent,
    LoginAdminComponent,
    ManutencaoSenhaComponent,
    EsqueciMinhaSenhaComponent,
    NovaSenhaComponent
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
