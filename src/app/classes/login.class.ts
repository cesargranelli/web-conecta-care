import { Role } from '../enums/role.enum';

export class Login {
  constructor(private email: string, private password: string, private role: Role) { }
}
