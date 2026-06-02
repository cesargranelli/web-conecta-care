import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const validEqualsEmail: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const email = control.get('email');
  const confirmarEmail = control.get('confirmarEmail');
  return email.value !== confirmarEmail.value ? {'validEmailEquals': true} : null;
};

export const validEqualsPassword: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmarPassword = control.get('confirmarPassword');
  return password.value !== confirmarPassword.value ? {'validPasswordEquals': true} : null;
};


export const equalEmails: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const email = control.get('email');
  const confirmEmail = control.get('confirmEmail');
  return email?.value !== confirmEmail?.value ? { equalEmails: true } : null;
};

export const equalPasswords: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password?.value !== confirmPassword?.value ? { equalPasswords: true } : null;
};
