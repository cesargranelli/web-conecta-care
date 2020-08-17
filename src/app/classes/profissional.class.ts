import {EstadoCivil} from './estado-civil.class';
import {Genero} from './genero.class';
import {TipoEmpresa} from './tipo-empresa.class';

export class Profissional {
  id: number;
  nome: string;
  sobrenome: string;
  dataNascimento: Data;
  rg: number;
  rgEmissor: string;
  rgDataEmissao: Data;
  pis: number;
  genero: Genero;
  tipoEmpresa: TipoEmpresa;
  estadoCivil: EstadoCivil;
  cnpj: number;
  ctps: number;
  ctpsSerie: number;
  fotoProfissional: any;
  fotoRg: any;
}

class Data {
  date: string;
  timezone: string;
  timezone_type: number;
}
