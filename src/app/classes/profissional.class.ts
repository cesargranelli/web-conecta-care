import {EstadoCivil} from './estado-civil.class';
import {Genero} from './genero.class';
import {TipoEmpresa} from './tipo-empresa.class';

export class Profissional {
  id: number;
  nome: String;
  sobrenome: String;
  dataNascimento: Data;
  rg: Number;
  rgEmissor: String;
  rgDataEmissao: Data;
  pis: Number;
  genero: Genero;
  tipoEmpresa: TipoEmpresa;
  estadoCivil: EstadoCivil;
  cnpj: Number;
  ctps: Number;
  ctpsSerie: Number;
  fotoProfissional: any;
  fotoRg: any;
}

class Data {
  date: string;
  timezone: string;
  timezone_type: number;
}
