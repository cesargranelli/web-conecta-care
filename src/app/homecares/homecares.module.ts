import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from '../auth/token.interceptor';
import { FormInformacoesLoginComponent } from '../shared/components/forms/informacoes-login/form-informacoes-login.component';
import { InformacoesLoginComponent } from './dados/informacoes-login/informacoes-login.component';
import { HomecaresRoutingModule } from './homecares-routing.module';
import { HomecaresComponent } from './homecares.component';

@NgModule({
  declarations: [
    HomecaresComponent,
    InformacoesLoginComponent,
    FormInformacoesLoginComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, HomecaresRoutingModule, NgxMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class HomecaresModule { }
