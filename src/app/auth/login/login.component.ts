import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedEventValidService } from 'src/app/shared/services/shared-event-valid.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { Login } from '../../classes/login.class';
import { Role } from '../../classes/role';
import { LoginService } from '../../services/login.service';
import { TokenService } from '../../services/token.service';
import { SharedEventTokenService } from '../../shared/services/shared-event-token.service';
import { SharedLoadingService } from '../../shared/services/shared-loading.service';
import { InputValidation } from '../../shared/validations/input-validation';
import { InputValidationHas } from '../../shared/validations/input-validation-has';

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js
declare function hideToolTip(): void; //Carrega a funcao hideToolTip() do app.js
declare function injetaToolTip(): void; //Carrega a funcao injetaToolTip() do app.js

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _role: Role = new Role('pacientes');

  public loginForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();
  public perfil: string = 'pacientes';

  public mensagemToolTip = `<div style="font-size:70%;">Mínimo de 8 caracteres<br>
  Máximo de 20 caracteres<br>
  Ao menos 1 letra maiúscula<br>
  Ao menos 1 letra minúscula<br>
  Ao menos 1 número<br>
  Ao menos 1 caracter especial</div>`;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _router: Router,
    private _validService: ValidService,
    private _tokenService: TokenService,
    private _loading: SharedLoadingService,
    private _eventToken: SharedEventTokenService,
    private _eventValid: SharedEventValidService
  ) {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*[0-9])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$')
      ]]
    });
  }

  ngOnInit(): void {
    carregarTarjaAzul();
    injetaToolTip();
  }

  setRole(perfil: string) {
    this._role = new Role(perfil);
  }

  onSubmit() {
    this._loading.emitChange(true);

    let login: Login = new Login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this._role.getRole()
    );

    this._service.login(login).subscribe(response => {
      setTimeout(() => {
        this.setValid(response.body.data);
        this._tokenService.setToken(response.body.data.token);
        this._eventToken.emitChange(this._tokenService.hasToken());
        this._eventValid.emitChange(this._validService.getValid());
        this._loading.emitChange(false);
        this._router.navigateByUrl(`${this._role.getPerfil()}/${response.body.data.id}`);
      });
    }, (error: Error) => {
      console.log(error);
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Usuário ou senha inválidos',
        showConfirmButton: true
      });
    });

    this._loading.emitChange(false);
  }

  setValid(response: any) {
    let valid: Valid = response;
    this._validService.setValid(valid);
  }

  ngOnDestroy() {
    hideToolTip();
  }
}
