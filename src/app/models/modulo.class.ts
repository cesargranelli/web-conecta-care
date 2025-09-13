import { Modulo as ModuloEnum } from '../enums/modulo.enum';
import { TipoDocumento as TipoDocumentoEnum } from '../enums/tipo-documento.enum';

export class Modulo {

  constructor(private name?: string, private tipo?: string, private path?: string) {
  }

  public getNome() {
    return this.name;
  }

  public getTipo() {
    return this.tipo;
  }

  public setModulo(nomeModulo: string): void {
    switch (nomeModulo) {
      case 'pacientes':
        this.name = ModuloEnum.Paciente;
        this.tipo = TipoDocumentoEnum.Cpf;
        this.path = 'paciente';
        break;
      case 'profissionais':
        this.name = ModuloEnum.Profissional;
        this.tipo = TipoDocumentoEnum.Cnpj;
        this.path = 'profissional';
        break;
      case 'homecares':
        this.name = ModuloEnum.Homecare;
        this.tipo = TipoDocumentoEnum.Cnpj;
        this.path = 'homecare';
        break;
      case 'planos-saude':
        this.name = ModuloEnum.PlanoSaude;
        this.tipo = TipoDocumentoEnum.Cnpj;
        this.path = 'plano-saude';
        break;
      case 'planos-saude-filial':
        this.name = ModuloEnum.PlanoSaude;
        this.tipo = TipoDocumentoEnum.Cnpj;
        this.path = 'plano-saude-filial';
        break;
      default:
        break;
    }
  }

  public getModulo(): ModuloEnum {
    switch (this.name) {
      case 'pacientes':
        return ModuloEnum.Paciente;
      case 'profissionais':
        return ModuloEnum.Profissional;
      case 'homecares':
        return ModuloEnum.Homecare;
      case 'planos-saude':
        return ModuloEnum.PlanoSaude;
      case 'planos-saude-filial':
        return ModuloEnum.PlanoSaude;
      default:
        break;
    }
  }

}
