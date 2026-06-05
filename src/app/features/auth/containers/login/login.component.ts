import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Login } from 'src/app/core/models/login.class';
import { Modulo } from 'src/app/core/models/modulo.class';
import { Authorization } from 'src/app/core/models/token';
import { Valid } from 'src/app/core/models/Valid';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { ValidPassword } from 'src/app/shared/constants/valid.password';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import { RoleConverter } from 'src/app/core/utils/role.converter';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { FormPasswordValidationComponent } from 'src/app/shared/components/forms/password-validation/form-password-validation.component';

declare var jQuery: any;
declare function carregarTarjaAzul(): void;
declare function hideToolTip(): void;
declare function injetaToolTip(): void;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormPasswordValidationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private readonly _router = inject(Router);
  private readonly _loading = inject(SharedLoadingService);
  private readonly _storeToken = inject(SharedTokenService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthService);
  private readonly _validService = inject(SharedValidService);
  private readonly _usuarioService = inject(UsuarioService);

  public loginForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  private modulo: Modulo = new Modulo();
  private converter: RoleConverter = new RoleConverter();
  private authorization: Authorization = new Authorization();

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(ValidPassword.PATTERN)]]
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
      const login: Login = new Login(this.loginForm.value.email, this.loginForm.value.password, this.modulo.getModulo());

      this._authService.login(login).subscribe(response => {
        if (response) {
          this.authorization.token = this._storeToken.getToken();
          this._usuarioService.consultar().subscribe(responseValid => {
            const valid: Valid = responseValid.body;
            if (valid.status.toUpperCase() != 'COMPLETO') {
              this._storeToken.removeToken();
              Swal.fire({ position: 'center', icon: 'warning', title: 'Usuário ainda não realizou a confirmação do cadastro!', showConfirmButton: true });
              return;
            }
            this.setValid(valid);
            this._loading.emitChange(false);
            const component = this.converter.toComponent(valid.role);
            this._router.navigateByUrl(`${component}/${valid.id}`);
          }, error => {
            Swal.fire({ position: 'center', icon: 'error', title: error, showConfirmButton: true });
          });
        }
        this._loading.emitChange(false);
      }, error => {
        Swal.fire({ position: 'center', icon: 'error', title: error, showConfirmButton: true });
        this._loading.emitChange(false);
      });
    });
  }

  setValid(response: any) {
    this._validService.setValid({
      id: response?.id, email: response?.email,
      role: this.converter.getRole(response?.role),
      status: response?.status,
      modulo: this.modulo.getModulo() == 'PACIENTE' ? this.modulo.getModulo() : null
    });
  }

  ngOnDestroy() {
    hideToolTip();
  }
}
