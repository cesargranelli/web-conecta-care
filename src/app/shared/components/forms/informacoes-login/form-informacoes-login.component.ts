import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario.class';
import { Role } from 'src/app/enums/role.enum';
import { Registro } from 'src/app/services/feat/registro';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validEqualsEmail, validEqualsPassword } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-form-informacoes-login',
  templateUrl: './form-informacoes-login.component.html',
  styleUrls: ['./form-informacoes-login.component.css']
})
export class FormInformacoesLoginComponent implements OnInit {

  tituloCartao: string = 'Informações de Login';
  public loginForm: FormGroup;
  public captcha: boolean = false;
  public emailEnviado: boolean = false;
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

  private _registro: Registro;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: UsuarioService,
    private _router: Router,
    private _loading: SharedLoadingService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');

    const navigation: Navigation = this._router.getCurrentNavigation();
    this._registro = navigation.extras.state?.register;
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
      ]]
    }, { validators: [validEqualsEmail, validEqualsPassword] });

  }

  onSubmit() {
    this._loading.emitChange(true);
    let login: Usuario = new Usuario(
      this.loginForm.value.email,
      this.loginForm.value.password,
      Role.Profissional,
      this._registro.id
    );

    this._service.cadastrar(login).subscribe(response => {
      setTimeout(() => {
        this.emailEnviado = true;
        this._loading.emitChange(false);
        this.onSuccess(response.body.data.message);
        this._router.navigateByUrl(`espera-confirmacao-email`);
      });
    }, httpResponse => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: httpResponse.error.data.message,
          showConfirmButton: true
        });
        this._loading.emitChange(false);
    });

  }

  setCaptcha(captcha: boolean) {
    this.captcha = captcha;
  }

  onSuccess(message: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: message,
      showConfirmButton: true
    });
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
