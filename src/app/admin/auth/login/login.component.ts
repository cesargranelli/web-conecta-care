import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/admin/auth/services/auth.service';
import { LoginAdmin } from 'src/app/admin/models/login-admin.model';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthAdminService,
    private _router: Router,
    private _loading: SharedLoadingService
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
  }

  onSubmit() {
    let login: LoginAdmin = new LoginAdmin(
      this.loginForm.value.email,
      this.loginForm.value.password
    );

    this._authService.login(login).subscribe(() => {
      this._loading.emitChange(true);
      setTimeout(() => {
        this._loading.emitChange(false);
        this._router.navigateByUrl(`admin/eventos`);
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
  }

}
