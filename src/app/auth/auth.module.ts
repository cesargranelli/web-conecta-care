import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginAdminComponent } from './containers/login-admin/login-admin.component';
import { EsqueciMinhaSenhaComponent } from './containers/login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './containers/login/login.component';
import { ManutencaoSenhaComponent } from './containers/login/manutencao-senha/manutencao-senha.component';
import { NovaSenhaComponent } from './containers/login/nova-senha/nova-senha.component';
import { TokenInterceptor } from './token.interceptor';

@NgModule({
  declarations: [
    LoginComponent,
    LoginAdminComponent,
    ManutencaoSenhaComponent,
    EsqueciMinhaSenhaComponent,
    NovaSenhaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedComponentModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {
}
