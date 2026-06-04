import { Role } from 'src/app/core/enums/role.enum';

export class Usuario {
  constructor(
    private email: string,
    private password: string,
    private role: Role,
    private sequence: number
  ) {}

  public getEmail() { return this.email; }
  public getPassword() { return this.password; }
  public getRole() { return this.role; }
  public getSequence() { return this.sequence; }
}
