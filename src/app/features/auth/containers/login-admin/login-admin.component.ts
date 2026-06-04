import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginAdmin } from 'src/app/features/admin/models/login-admin.model';
import { AuthAdminService } from 'src/app/features/auth/services/auth-admin.service';
import { ValidPassword } from 'src/app/shared/constants/valid.password';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _authService = inject(AuthAdminService);
  private readonly _router = inject(Router);
  private readonly _loading = inject(SharedLoadingService);

  public loginForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  constructor() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(ValidPassword.PATTERN)]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    setTimeout(() => {
      const login: LoginAdmin = new LoginAdmin(this.loginForm.value.email, this.loginForm.value.password);
      this._authService.login(login).subscribe(response => {
        this._loading.emitChange(true);
        if (response) {
          this._loading.emitChange(false);
          this._router.navigateByUrl('admin/eventos');
        }
        this._loading.emitChange(false);
      });
    });
  }
}
