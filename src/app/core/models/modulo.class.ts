import { Modulo as ModuloEnum } from 'src/app/core/enums/modulo.enum';

export class Module {
  constructor(private _name?: string) {}

  getName(): string | undefined { return this._name; }
  setModule(name: string): void { this._name = name; }

  getModule(): ModuloEnum {
    switch (this._name) {
      case 'pacientes':      return ModuloEnum.Paciente;
      case 'profissionais':  return ModuloEnum.Profissional;
      case 'homecares':      return ModuloEnum.Homecare;
      case 'planos-saude':
      case 'planos-saude-filial': return ModuloEnum.PlanoSaude;
      default:               return undefined!;
    }
  }

  /** @deprecated Use getName() */
  getNome(): string | undefined { return this.getName(); }
  /** @deprecated Use setModule() */
  setModulo(name: string): void { this.setModule(name); }
  /** @deprecated Use getModule() */
  getModulo(): ModuloEnum { return this.getModule(); }
}

/** @deprecated Use Module instead */
export { Module as Modulo };
