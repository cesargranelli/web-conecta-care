import { EstadoCivil } from './estado-civil.class';
import { Genero } from './genero.class';
import { TipoEmpresa } from './tipo-empresa.class';

export class Profissional {
    cpf: Number;
    nome: String;
    sobrenome: String;
    dataNascimento: Date;
    rg: Number;
    rgEmissor: String;
    rgDataEmissao: Date;
    pis: Number;
    genero: Genero;
    tipoEmpresa: TipoEmpresa;
    estadoCivil: EstadoCivil;
    cnpj: Number;
    ctps: Number;
    ctpsSerie: Number;
    fotoProfissional: String;
    fotoRg: [];
}
