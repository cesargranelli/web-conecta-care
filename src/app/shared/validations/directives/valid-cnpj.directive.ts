import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidadorCnpj} from 'src/app/utils/validador-cnpj.utils';

export function validCnpj(obrigatorio: boolean): ValidatorFn {
  let validaCnpj: ValidadorCnpj = new ValidadorCnpj();
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = validaCnpj.validar(control.value);
    if (!obrigatorio && !control.value) {
      return null;
    }
    return !result ? {'cpfInvalido': {value: control.value}} : null;
  };
}
