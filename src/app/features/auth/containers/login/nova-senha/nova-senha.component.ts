import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NovaSenha } from 'src/app/core/models/nova-senha';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { ValidPassword } from 'src/app/shared/constants/valid.password';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validEqualsPassword } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nova-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _service = inject(LoginService);
  private readonly _router = inject(Router);
  private readonly _loading = inject(SharedLoadingService);

  public novaSenhaForm: FormGroup;
  public validation: InputValidation = new InputValidation();
  public validationHas: InputValidationHas = new InputValidationHas();

  ngOnInit(): void {
    this.novaSenhaForm = this._formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(ValidPassword.PATTERN)]],
      confirmarPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    }, { validators: validEqualsPassword });
  }

  onSubmit() {
    setTimeout(() => {
      this._loading.emitChange(true);
      const novaSenha: NovaSenha = new NovaSenha(this.novaSenhaForm.value.password);

      this._service.novaSenha(novaSenha).subscribe(response => {
        if (response.ok) {
          this._loading.emitChange(false);
          this._router.navigateByUrl('login');
          Swal.fire({ position: 'center', icon: 'success', title: 'Senha alterada com sucesso, efetue o login com a nova senha!', showConfirmButton: true });
        }
      }, httpError => {
        this._loading.emitChange(false);
        Swal.fire({ position: 'center', icon: 'error', title: httpError.error.message, showConfirmButton: true });
      });
    });
  }
}
