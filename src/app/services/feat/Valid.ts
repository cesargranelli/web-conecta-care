import { Modulo } from 'src/app/enums/modulo.enum';
import { Role } from 'src/app/enums/role.enum';

export class Valid {
  email: string = '';
  role: Role = null;
  id: number = null;
  status?: string = null;
  modulo?: Modulo = null;
}
