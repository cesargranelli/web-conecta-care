import { Role } from 'src/app/enums/role.enum';

export interface Valid {
  email: string;
  role: Role;
  id: number;
}
