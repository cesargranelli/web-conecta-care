import { Role as RoleEnum } from '../enums/role.enum';

export class Role {

  constructor(private _perfil: string) {}

  public getPerfil(): string {
    return this._perfil;
  }

  public getRole(): RoleEnum {
    switch (this._perfil) {
      case 'pacientes':
        return RoleEnum.Paciente
      case 'profissionais':
        return RoleEnum.Profissional
      case 'homecares':
        return RoleEnum.Homecare
      case 'convenios':
        return RoleEnum.Convenio
      default:
        break;
    }
  }

}
