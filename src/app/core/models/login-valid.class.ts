import { Modulo } from 'src/app/core/enums/modulo.enum';

export class LoginValid {
  constructor(private email: string, private modulo: Modulo) {}
}
