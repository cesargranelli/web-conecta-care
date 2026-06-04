import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha-2';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { FormEnderecoComponent } from './forms/endereco/form-endereco.component';
import { FormInformacoesLoginComponent } from './forms/informacoes-login/form-informacoes-login.component';
import { FormPasswordValidationComponent } from './forms/password-validation/form-password-validation.component';
import { BasicRecaptchaComponent } from './recaptcha/basic-recaptcha.component';
import { CardVerDadosComponent } from './cards/card-ver-dados/card-ver-dados.component';
import { SelectPickerComponent } from './selects/select-picker/select-picker.component';

@NgModule({
  declarations: [
    FormInformacoesLoginComponent,
    FormEnderecoComponent,
    BasicRecaptchaComponent,
    FormPasswordValidationComponent,
    CardVerDadosComponent,
    SelectPickerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    RecaptchaModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    FormInformacoesLoginComponent,
    FormEnderecoComponent,
    FormPasswordValidationComponent,
    CardVerDadosComponent,
    SelectPickerComponent
  ]
})
export class SharedComponentModule {
}
