import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxMaskModule } from 'ngx-mask';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';
import { CadastroLoginComponent } from './login/cadastro-login.component';
import { BasicRecaptchaComponent } from '../components/recaptcha/basic-recaptcha.component';

@NgModule({
  declarations: [
    CadastroComponent,
    CadastroLoginComponent,
    BasicRecaptchaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentModule,
    CadastroRoutingModule,
    NgxMaskModule,
    RecaptchaModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CadastroModule { }
