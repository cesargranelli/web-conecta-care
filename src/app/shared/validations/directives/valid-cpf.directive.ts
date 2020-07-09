import { ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidadorCpf } from '../../../utils/validador-cpf.utils';

export function validCpf(): ValidatorFn {
  let validaCpf: ValidadorCpf = new ValidadorCpf();
  return (control: AbstractControl): {[key: string]: any} | null => {
    const result = validaCpf.validar(control.value);
    return !result ? {'cpfInvalido': {value: control.value}} : null;
  };
}
