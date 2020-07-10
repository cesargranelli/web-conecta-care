import { Role } from '../enums/role.enum';

export class Login {

  constructor(private _email: string, private _password: string, private _role: Role) { }

  public get email() { return this._email; }
  public get password() { return this._password; }
  public get role() { return this._role; }

}
