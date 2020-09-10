import {Instrucao} from './instrucao.class';

export class Escolaridade {
  instrucao: Instrucao;
  instituicaoEnsino: Array<string> = new Array<string>();
  anoConclusao: Array<string> = new Array<string>();
  proprietarioId: number;
}
