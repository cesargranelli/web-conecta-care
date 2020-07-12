import { FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export const validEqualsEmail: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const email = control.get('email');
  const confirmarEmail = control.get('confirmarEmail');
  return email.value !== confirmarEmail.value ? { 'validEquals': true } : null;
};

export const validEqualsPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmarPassword');
  return password.value !== confirmarPassword.value ? { 'validEquals': true } : null;
};

