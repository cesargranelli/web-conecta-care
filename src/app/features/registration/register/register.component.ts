import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { finalize } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MessageModule } from 'primeng/message';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import { Profile, PROFILES, RegistrationStep } from '../models/registration.model';
import { RegistrationService } from '../services/registration.service';

function passwordMatchValidator(): ValidatorFn {
  return (group: AbstractControl) =>
    group.get('password')?.value === group.get('confirmPassword')?.value
      ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective,
    ButtonModule, CardModule, InputTextModule, PasswordModule, MessageModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(RegistrationService);
  private readonly router = inject(Router);

  readonly profiles = PROFILES;
  readonly step = signal<RegistrationStep>('profile');
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly selectedProfile = signal<Profile | null>(null);

  readonly docForm = this.fb.group({ document: ['', Validators.required] });
  readonly credForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: passwordMatchValidator() }
  );

  readonly stepIndex = computed(() =>
    (['profile', 'document', 'credentials'] as RegistrationStep[]).indexOf(this.step())
  );

  selectProfile(profile: Profile): void {
    this.selectedProfile.set(profile);
    this.docForm.get('document')!.setValidators([
      Validators.required,
      profile.docType === 'CPF' ? validCpf(true) : validCnpj(true),
    ]);
    this.docForm.reset();
    this.error.set(null);
    this.step.set('document');
  }

  submitDocument(): void {
    if (this.docForm.invalid) return;
    this.error.set(null);
    this.step.set('credentials');
  }

  submitCredentials(): void {
    if (this.credForm.invalid) return;
    const profile = this.selectedProfile()!;
    const { email, password } = this.credForm.value;
    this.loading.set(true);
    this.error.set(null);
    this.svc
      .register(
        { number: this.docForm.value.document!, type: profile.docType, module: profile.module },
        { email: email!, password: password!, role: profile.role }
      )
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: record => this.router.navigateByUrl(`/${profile.id}/${record.id}/register/login`),
        error: err => this.error.set(err.error?.message ?? err.error?.error?.[0] ?? 'Erro ao realizar cadastro.'),
      });
  }

  back(): void {
    this.error.set(null);
    this.step.set(this.step() === 'credentials' ? 'document' : 'profile');
  }

  get docCtrl() { return this.docForm.get('document')!; }
  get emailCtrl() { return this.credForm.get('email')!; }
  get passwordCtrl() { return this.credForm.get('password')!; }
  get confirmCtrl() { return this.credForm.get('confirmPassword')!; }
}
