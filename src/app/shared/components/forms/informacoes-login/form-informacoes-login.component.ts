import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  esconderFormulario: boolean = true;

  tituloCartao: string = 'Informações de Login';
  loginForm: FormGroup;
  captcha: boolean = false;
  email: string;
  confirmarEmail: string;
  password: string;
  confirmarPassword: string;
  input: InputValidation = new InputValidation();
  inputHas: InputValidationHas = new InputValidationHas();

  @Output() onSubmitEvent = new EventEmitter<FormGroup>()

  public mensagemToolTip = `<div style="font-size:70%;">Mínimo de 8 caracteres<br>
  Máximo de 20 caracteres<br>
  Ao menos 1 letra maiúscula<br>
  Ao menos 1 letra minúscula<br>
  Ao menos 1 número<br>
  Ao menos 1 caracter especial</div>`;

  constructor(private _formBuilder: FormBuilder) { }

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
      ]]
    }, { validators: [validEqualsEmail, validEqualsPassword] });
    this.esconderFormulario = false;
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
        return { invalid: control.value }
      }
    };
  }

  equalsPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.loginForm?.controls.password.value) {
        return null;
      } else {
        return { invalid: control.value }
      }
    };
  }

}
