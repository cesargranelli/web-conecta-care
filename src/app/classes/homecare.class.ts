import {EstadoCivil} from './estado-civil.class';
import {Genero} from './genero.class';
import {TipoEmpresa} from './tipo-empresa.class';

export class Homecare {
  id: number;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  rg: number;
  rgEmissor: string;
  rgDataEmissao: string;
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
