import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { InformacoesLoginComponent } from './dados/informacoes-login/informacoes-login.component';
import { HomecaresRoutingModule } from './homecares-routing.module';
import { HomecaresComponent } from './homecares.component';

@NgModule({
  declarations: [
    HomecaresComponent,
    CadastroLoginComponent,
    CadastroEnderecoComponent,
    InformacoesLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomecaresRoutingModule,
    NgxMaskModule,
    SharedComponentModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class HomecaresModule { }
