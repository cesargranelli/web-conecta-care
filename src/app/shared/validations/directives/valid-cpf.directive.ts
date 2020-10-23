import {AbstractControl, ValidatorFn} from '@angular/forms';
import {ValidadorCpf} from 'src/app/utils/validador-cpf.utils';

export function validCpf(obrigatorio: boolean): ValidatorFn {
  let validaCpf: ValidadorCpf = new ValidadorCpf();
  return (control: AbstractControl): { [key: string]: any } | null => {
    const result = validaCpf.validar(control.value);
    if (!obrigatorio && !control.value) {
      return null;
    }
    return !result ? {'cpfInvalido': {value: control.value}} : null;
  };
}
