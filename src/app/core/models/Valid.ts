import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Role } from 'src/app/core/enums/role.enum';

export interface Valid {
  email: string;
  role: Role;
  id: number;
  status?: string;
  modulo?: Modulo;
}
