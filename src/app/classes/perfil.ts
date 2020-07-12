import { Role } from '../enums/role.enum';

export class Perfil {

  constructor(private role: string) {}

  public setRole(role: string) {
    this.role = role;
  }

  public getPerfil(): string {
    return this.getContexto(this.role);
  }

  private getContexto(role: string): string {
    switch (role) {
      case Role.Paciente:
        return 'pacientes'
      case Role.Profissional:
        return 'profissionais'
      case Role.Homecare:
        return 'homecares'
      case Role.Convenio:
        return 'convenios'
      default:
        break;
    }
  }

}
