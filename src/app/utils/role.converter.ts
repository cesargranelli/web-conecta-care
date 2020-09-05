import { Role as RoleEnum } from 'src/app/enums/role.enum';

export class RoleConverter {

  toComponent(role: RoleEnum): string {
    switch (role) {
      case RoleEnum.Paciente:
        return 'pacientes'
      case RoleEnum.Profissional:
        return 'profissionais'
      case RoleEnum.Homecare:
        return 'homecares'
      case RoleEnum.Convenio:
        return 'convenios'
      default:
        break;
    }
  }

  toRole(roleString: string): RoleEnum {
    switch (roleString) {
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
