import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginAdmin} from 'src/app/admin/models/login-admin.model';
import {AuthAdminService} from 'src/app/auth/services/auth-admin.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidation} from 'src/app/shared/validations/input-validation';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

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

    this._authService.login(login).subscribe(response => {
      this._loading.emitChange(true);
      if (response) {
        setTimeout(() => {
          this._loading.emitChange(false);
          this._router.navigateByUrl(`admin/eventos`);
        });
      }
      this._loading.emitChange(false);
    });
  }

}
