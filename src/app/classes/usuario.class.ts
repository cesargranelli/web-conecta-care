import { Role } from '../enums/role.enum';

export class Usuario {

  private email: string;
  private password: string;
  private role: Role;
  private sequence: number;

  constructor(email: string, password: string, role: Role, sequence: number) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.sequence = sequence;
  }

  public getEmail() { return this.email; }
  public getPassword() { return this.password; }
  public getRole() { return this.role; }
  public getSequence() { return this.sequence; }

}
