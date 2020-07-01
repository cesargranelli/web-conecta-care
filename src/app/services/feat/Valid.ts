import { Role } from 'src/app/enums/role.enum';

export interface Valid {
  token: String;
  role: Role;
  id: Number;
}
