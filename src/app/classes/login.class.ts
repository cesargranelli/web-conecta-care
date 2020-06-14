import { Role } from '../enums/role.enum';

export class Login {

  private email: string;
  private password: string;
  private role: Role;

  constructor(email: string, password: string, role: Role) {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  public getEmail() { return this.email; }
  public getPassword() { return this.password; }
  public getRole() { return this.role; }

}
