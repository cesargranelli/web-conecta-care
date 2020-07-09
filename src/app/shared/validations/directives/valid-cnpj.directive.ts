import { AbstractControl, ValidatorFn } from '@angular/forms';
import { ValidadorCnpj } from 'src/app/utils/validador-cnpj.utils';

export function validCnpj(): ValidatorFn {
  let validaCnpj: ValidadorCnpj = new ValidadorCnpj();
  return (control: AbstractControl): {[key: string]: any} | null => {
    const result = validaCnpj.validar(control.value);
    return !result ? {'cpfInvalido': {value: control.value}} : null;
  };
}
