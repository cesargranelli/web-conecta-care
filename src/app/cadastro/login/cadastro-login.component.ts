import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/classes/role';
import { Usuario } from 'src/app/classes/usuario.class';
import { Registro } from 'src/app/services/feat/registro';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validEqualsEmail, validEqualsPassword } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Login } from 'src/app/classes/login.class';
import { Modulo } from 'src/app/classes/modulo';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { EmailService } from '../services/email.service';
import { SendEmail } from '../classes/send-email.class';
import { environment } from 'src/environments/environment';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public cadastroLoginForm: FormGroup;
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

  private registro: Registro;
  private registroId: number;
  private registroModulo: string;

  constructor(
    private _tokenService: SharedTokenService,
    private _formBuilder: FormBuilder,
    private _service: UsuarioService,
    private _authService: AuthService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _route: ActivatedRoute,
    private _emailService: EmailService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
    this._route.params.subscribe(params => this.registroId = params['id']);
    this._route.params.subscribe(params => this.registroModulo = params['modulo']);
  }

  ngOnInit(): void {

    this.cadastroLoginForm = this._formBuilder.group({
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
    }, {validators: [validEqualsEmail, validEqualsPassword]});

  }

  onSubmit() {
    this._loading.emitChange(true);
    let usuario: Usuario = new Usuario(
      this.cadastroLoginForm.value.email,
      this.cadastroLoginForm.value.password,
      new Role(this.registroModulo).getRole(),
      this.registroId
    );

    setTimeout(() => {
      this._loading.emitChange(true);
      this._service.cadastrar(usuario).subscribe(response => {
        if (response.status == 201) {
          let login: Login = new Login(
            this.cadastroLoginForm.value.email,
            this.cadastroLoginForm.value.password,
            new Modulo(this.registroModulo).getModulo()
          );
          setTimeout(() => {
            this._loading.emitChange(true);
            this._authService.login(login).subscribe(response => {
              if (response) {

                let email = new SendEmail();
                email.email = this.cadastroLoginForm.value.email;
                email.token = this._tokenService.getToken();
                email.role  = new Modulo(this.registroModulo).getModulo();

                this._tokenService.removeToken();

                setTimeout(() => {
                  this._loading.emitChange(true);
                  this._emailService.enviar(email).subscribe(response => {
                    this.emailEnviado = true;
                    this._loading.emitChange(false);
                    this.onSuccess();
                    this._router.navigateByUrl(`espera-confirmacao-email`);
                  }, error => {
                    Swal.fire({
                      position: 'center',
                      icon: 'error',
                      title: error.message,
                      showConfirmButton: true
                    });
                  });
                });
              }
              this._loading.emitChange(false);
            }, error => {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: error.data,
                showConfirmButton: true
              });
              this._loading.emitChange(false);
            });
          });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: response.statusText,
            showConfirmButton: true
          });
          this._loading.emitChange(false);
        }
      }, httpResponse => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: httpResponse.error.data?.message,
          showConfirmButton: true
        });
        this._loading.emitChange(false);
      });
    });

  }

  setCaptcha(captcha: boolean) {
    this.captcha = captcha;
  }

  onSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      text: 'Acabamos de enviar um link no e-mail informado para terminar o cadastro de seus dados e efetivar o acesso ao sistema. Caso você não encontre-o em sua caixa de entrada, por favor verifique na sua caixa de spam',
      showConfirmButton: true
    });
  }

  equalsEmail(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.cadastroLoginForm?.controls.email.value) {
        return null;
      } else {
        return {invalid: control.value};
      }
    };
  }

  equalsPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.cadastroLoginForm?.controls.password.value) {
        return null;
      } else {
        return {invalid: control.value};
      }
    };
  }

}
