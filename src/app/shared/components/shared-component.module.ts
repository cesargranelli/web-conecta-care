import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxMaskModule } from 'ngx-mask';
import { FormEnderecoComponent } from './forms/endereco/form-endereco.component';
import { FormInformacoesLoginComponent } from './forms/informacoes-login/form-informacoes-login.component';
import { FormPasswordValidationComponent } from './forms/password-validation/form-password-validation.component';
import { BasicRecaptchaComponent } from './recaptcha/basic-recaptcha.component';

@NgModule({
  declarations: [
    FormInformacoesLoginComponent,
    FormEnderecoComponent,
    BasicRecaptchaComponent,
    FormPasswordValidationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskModule,
    RecaptchaModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    FormInformacoesLoginComponent,
    FormEnderecoComponent,
    FormPasswordValidationComponent
  ]
})
export class SharedComponentModule {
}
