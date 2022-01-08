import { Modulo as ModuloEnum } from '../enums/modulo.enum';

export class Modulo {

  constructor(private _name?: string) {
  }

  public getNome() {
    return this._name;
  }

  public setModulo(nomeModulo: string): void {
    this._name = nomeModulo;
  }

  public getModulo(): ModuloEnum {
    switch (this._name) {
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
