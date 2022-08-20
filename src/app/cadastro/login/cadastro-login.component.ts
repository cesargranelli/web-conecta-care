import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Modulo } from 'src/app/classes/modulo.class';
import { Role } from 'src/app/classes/role';
import { Usuario } from 'src/app/classes/usuario.class';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidPassword } from 'src/app/shared/constants/valid.password';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { validEqualsEmail, validEqualsPassword } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { SendEmail } from '../classes/send-email.class';
import { EmailService } from '../services/email.service';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public cadastroLoginForm: FormGroup;
  public captcha: boolean = true;
  public emailEnviado: boolean = false;
  public email: string;
  public confirmarEmail: string;
  public password: string;
  public confirmarPassword: string;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  private registroId: number;
  private registroModulo: string;

  constructor(
    private _tokenService: SharedTokenService,
    private _formBuilder: FormBuilder,
    private _service: UsuarioService,
    private _authService: AuthService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _activatedRoute: ActivatedRoute,
    private _emailService: EmailService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {
      console.log(params);
      this.registroId = params['id'];
      this.registroModulo = params['modulo'];
    });
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
        Validators.pattern(ValidPassword.PATTERN)
      ]],
      confirmarPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(ValidPassword.PATTERN),
        this.equalsPassword()
      ]],
      termo: ['', [Validators.requiredTrue]]
    }, { validators: [validEqualsEmail, validEqualsPassword] });

  }

  onSubmit() {
    this._loading.emitChange(true);
    const usuario: Usuario = new Usuario(
      this.cadastroLoginForm.value.email,
      this.cadastroLoginForm.value.password,
      new Role(this.registroModulo).getRole(),
      this.registroId
    );

    setTimeout(() => {
      this._loading.emitChange(true);
      this._service.cadastrar(usuario).subscribe(response => {
        if (response.status === 201) {
          setTimeout(() => {
            const email = new SendEmail();
            email.email = this.cadastroLoginForm.value.email;
            email.token = response.body.token;
            email.role = new Modulo(this.registroModulo).getModulo();

            setTimeout(() => {
              this._loading.emitChange(true);
              this._emailService.enviar(email).subscribe(() => {
                this.emailEnviado = true;
                this._loading.emitChange(false);
                this.onSuccess();
                this._router.navigateByUrl(`espera-confirmacao-email`);
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
            this._loading.emitChange(false);
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
        return { invalid: control.value };
      }
    };
  }

  equalsPassword(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value == this.cadastroLoginForm?.controls.password.value) {
        return null;
      } else {
        return { invalid: control.value };
      }
    };
  }

}
