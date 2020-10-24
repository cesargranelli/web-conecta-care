import {Role as RoleEnum} from 'src/app/enums/role.enum';

export class RoleConverter {

  toComponent(role: RoleEnum): string {
    switch (role) {
      case RoleEnum.Paciente:
        return 'pacientes';
      case RoleEnum.Profissional:
        return 'profissionais';
      case RoleEnum.Homecare:
        return 'homecares';
      case RoleEnum.Convenio:
        return 'convenios';
      default:
        break;
    }
  }

  toRole(component: string): RoleEnum {
    switch (component) {
      case 'pacientes':
        return RoleEnum.Paciente;
      case 'profissionais':
        return RoleEnum.Profissional;
      case 'homecares':
        return RoleEnum.Homecare;
      case 'convenios':
        return RoleEnum.Convenio;
      default:
        break;
    }
  }

  getRole(roleString: string): RoleEnum {
    switch (roleString) {
      case 'ROLE_ADMIN_ROOT':
        return RoleEnum.Root;
      case 'ROLE_PACIENTE':
        return RoleEnum.Paciente;
      case 'ROLE_PROFISSIONAL':
        return RoleEnum.Profissional;
      case 'ROLE_HOMECARE':
        return RoleEnum.Homecare;
      case 'ROLE_CONVENIO':
        return RoleEnum.Convenio;
      default:
        break;
    }
  }

}
