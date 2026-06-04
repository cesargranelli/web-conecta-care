import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EsqueciMinhaSenha } from 'src/app/core/models/esqueci-senha';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-esqueci-minha-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _loading = inject(SharedLoadingService);
  private readonly _service = inject(LoginService);

  public emailForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  ngOnInit(): void {
    this.emailForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    setTimeout(() => {
      this._loading.emitChange(true);
      const esqueciMinhaSenha: EsqueciMinhaSenha = new EsqueciMinhaSenha(this.emailForm.value.email);

      this._service.esqueciMinhaSenha(esqueciMinhaSenha).subscribe(response => {
        this._loading.emitChange(false);
        Swal.fire({ position: 'center', icon: 'success', title: response.body.message, showConfirmButton: true })
          .then(() => this._router.navigateByUrl('login'));
      }, err => {
        this._loading.emitChange(false);
        Swal.fire({ position: 'center', icon: 'error', title: err.error.message, showConfirmButton: true });
      });
    });
  }
}
