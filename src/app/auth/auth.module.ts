import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { EsqueciMinhaSenhaComponent } from './login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './login/login.component';
import { ManutencaoSenhaComponent } from './login/manutencao-senha/manutencao-senha.component';
import { NovaSenhaComponent } from './login/nova-senha/nova-senha.component';

@NgModule({
  declarations: [
    LoginComponent,
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
