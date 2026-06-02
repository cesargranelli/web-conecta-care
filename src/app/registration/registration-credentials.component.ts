import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Module } from 'src/app/classes/modulo.class';
import { Role } from 'src/app/classes/role';
import { Usuario } from 'src/app/classes/usuario.class';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidPassword } from 'src/app/shared/constants/valid.password';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { equalEmails, equalPasswords } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { EmailPayload } from '../models/email-payload.model';
import { EmailService } from '../services/email.service';

declare var jQuery: any;

@Component({
  selector: 'app-registration-credentials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './registration-credentials.component.html',
  styleUrls: ['./registration-credentials.component.css']
})
export class RegistrationCredentialsComponent implements OnInit, OnDestroy {

  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UsuarioService);
  private readonly emailService = inject(EmailService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly loading = inject(SharedLoadingService);

  form!: FormGroup;
  input = new InputValidation();
  inputHas = new InputValidationHas();

  private registrationId!: number;
  private registrationModule!: string;
  private routeSub!: Subscription;

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    // Bug fix: store subscription to unsubscribe on destroy
    this.routeSub = this.route.params.subscribe(params => {
      this.registrationId = +params['id'];
      this.registrationModule = params['modulo'];
    });

    this.form = this.fb.group({
      email:            ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      confirmEmail:     ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      password:         ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(ValidPassword.PATTERN)]],
      confirmPassword:  ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(ValidPassword.PATTERN)]],
      terms:            [false, [Validators.requiredTrue]]
    }, { validators: [equalEmails, equalPasswords] });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.loading.emitChange(true);

    const user = new Usuario(
      this.form.value.email,
      this.form.value.password,
      new Role(this.registrationModule).getRole(),
      this.registrationId
    );

    // Bug fix: removed unnecessary setTimeout wrapper
    this.userService.cadastrar(user).subscribe({
      next: response => {
        if (response.status !== 201) {
          this.loading.emitChange(false);
          Swal.fire({ position: 'center', icon: 'warning', title: response.statusText, showConfirmButton: true });
          return;
        }

        const payload: EmailPayload = {
          email: this.form.value.email,
          token: response.body?.token,
          role: new Module(this.registrationModule).getModule()
        };

        this.emailService.send(payload).subscribe({
          next: () => {
            this.loading.emitChange(false);
            Swal.fire({
              position: 'center', icon: 'success',
              text: 'Enviamos um link para o e-mail informado. Caso não encontre na caixa de entrada, verifique o spam.',
              showConfirmButton: true
            });
            this.router.navigateByUrl('espera-confirmacao-email');
          },
          error: err => {
            this.loading.emitChange(false);
            Swal.fire({ position: 'center', icon: 'error', title: err.error?.message ?? 'Erro ao enviar e-mail.', showConfirmButton: true });
          }
        });
      },
      error: err => {
        this.loading.emitChange(false);
        Swal.fire({
          position: 'center', icon: 'error',
          title: err.error?.data?.message ?? err.error?.message ?? 'Erro ao realizar cadastro.',
          showConfirmButton: true
        });
      }
    });
  }

  // Bug fix: unsubscribe to avoid memory leak
  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
