import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { validEqualsEmail, validEqualsPassword } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

declare var jQuery: any;

@Component({
  selector: 'app-form-informacoes-login',
  templateUrl: './form-informacoes-login.component.html',
  styleUrls: ['./form-informacoes-login.component.css']
})
export class FormInformacoesLoginComponent implements OnInit {

  @Input()
  public linkBotaoCancelar: string = '/';

  @Input()
  public mostrarflagAceitePrivacidade: boolean;

  @Output()
  public onSubmitEvent = new EventEmitter<FormGroup>();

  public tituloCartao: string = 'Informações de Login';
  public esconderFormulario: boolean = true;
  public loginForm: FormGroup;
  public captcha: boolean = false;
  public email: string;
  public confirmarEmail: string;
  public password: string;
  public confirmarPassword: string;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  public mensagemToolTip = `<div style="font-size:70%;">Mínimo de 8 caracteres<br>
  Máximo de 20 caracteres<br>
  Ao menos 1 letra maiúscula<br>
  Ao menos 1 letra minúscula<br>
  Ao menos 1 número<br>
  Ao menos 1 caracter especial</div>`;

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      confirmarEmail: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100),
        this.equalsEmail()
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$')
      ]],
      confirmarPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$'),
        this.equalsPassword()
      ]],
      flagAceitePrivacidade: []
    }, {validators: [validEqualsEmail, validEqualsPassword]});
    if (this.mostrarflagAceitePrivacidade) {
      this.loginForm.get('flagAceitePrivacidade').setValidators(Validators.required);
    }
    this.esconderFormulario = false;
  }

  teste(teste: HTMLInputElement) {
    console.log(teste.value)
  }

  onSubmit() {
    this.onSubmitEvent.emit(this.loginForm);
  }

  setCaptcha(captcha: boolean) {
    this.captcha = captcha;
  }

  equalsEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.loginForm?.controls.email.value) {
        return null;
      } else {
        return {invalid: control.value};
      }
    };
  }

  equalsPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.loginForm?.controls.password.value) {
        return null;
      } else {
        return {invalid: control.value};
      }
    };
  }

}
