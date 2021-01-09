import { Modulo } from '../enums/modulo.enum';

export class Login {
  constructor(private email: string, private password: string, private modulo: Modulo) {
  }
}
