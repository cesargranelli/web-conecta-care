import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/classes/login.class';
import { Modulo } from 'src/app/classes/modulo';
import { CadastroService } from 'src/app/services/cadastro.service';
import { Authorization } from 'src/app/services/feat/token';
import { Valid } from 'src/app/services/feat/Valid';
import { ValidPassword } from 'src/app/shared/constants/valid.password';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import { RoleConverter } from 'src/app/utils/role.converter';
import { AuthService } from '../../services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js
declare function hideToolTip(): void; //Carrega a funcao hideToolTip() do app.js
declare function injetaToolTip(): void; //Carrega a funcao injetaToolTip() do app.js

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  private modulo: Modulo = new Modulo();
  private converter: RoleConverter = new RoleConverter();
  private authorization: Authorization = new Authorization();

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _storeToken: SharedTokenService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _validService: SharedValidService,
    private _usuarioService: UsuarioService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');

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
        Validators.pattern(ValidPassword.PATTERN)
      ]]
    });
  }

  ngOnInit(): void {
    this.modulo.setModulo('pacientes');
    carregarTarjaAzul();
    injetaToolTip();
  }

  setModulo(perfil: string) {
    this.modulo = new Modulo(perfil);
  }

  onSubmit() {
    setTimeout(() => {
      this._loading.emitChange(true);
      let login: Login = new Login(
        this.loginForm.value.email,
        this.loginForm.value.password,
        this.modulo.getModulo()
      );

      this._authService.login(login).subscribe(response => {
        if (response) {
          this.authorization.token = this._storeToken.getToken();
          this._usuarioService.consultar(this.authorization).subscribe(responseValid => {
            let valid: Valid = responseValid.body.data;
            this._validService.setValid(valid);
            this._loading.emitChange(false);
            let component = this.converter.toComponent(valid.role);
            this._router.navigateByUrl(`${component}/${valid.id}`);
          });
        }
        this._loading.emitChange(false);
      }, error => {
        console.log(error)
      });
    });
  }

  setValid(response: any) {
    this._validService.setValid({id: response?.id, email: response?.email, role: this.converter.getRole(response?.role)});
  }

  ngOnDestroy() {
    hideToolTip();
  }
}
