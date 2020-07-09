import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  console.log(nameRe);
  return (control: AbstractControl): {[key: string]: any} | null => {
    console.log(control.value);
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
