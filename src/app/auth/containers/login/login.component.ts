import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/classes/login.class';
import { Role } from 'src/app/classes/role';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import { RoleConverter } from 'src/app/utils/role.converter';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

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
  public perfil: string = 'pacientes';

  public mensagemToolTip = `<div style="font-size:70%;">Mínimo de 8 caracteres<br>
  Máximo de 20 caracteres<br>
  Ao menos 1 letra maiúscula<br>
  Ao menos 1 letra minúscula<br>
  Ao menos 1 número<br>
  Ao menos 1 caracter especial</div>`;

  private _role: Role = new Role('pacientes');
  private converter: RoleConverter = new RoleConverter();

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _validService: SharedValidService
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

    this._authService.login(login).subscribe(response => {
      this._loading.emitChange(true);
      if (response) {
        setTimeout(() => {
          this._loading.emitChange(false);
          let component = this.converter.toComponent(this._validService.valid.role);
          this._router.navigateByUrl(`${component}/${this._validService.valid.id}`);
        });
      }
      this._loading.emitChange(false);
    });

  }

  setValid(response: any) {
    let valid: Valid = response;
    // this._validService.setValid(valid);
  }

  ngOnDestroy() {
    hideToolTip();
  }
}
