import { Modulo } from '../enums/modulo.enum';

export class LoginValid {
  constructor(private email: string, private modulo: Modulo) {
  }
}
