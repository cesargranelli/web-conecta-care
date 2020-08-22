import {Instrucao} from './instrucao.class';

export class Escolaridade {
  instrucao: Instrucao;
  instituicaoEnsino: Array<string> = new Array<string>(3);
  anoConclusao: Array<string> = new Array<string>(3);
  proprietarioId: number;
}
