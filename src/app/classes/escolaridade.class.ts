import { Instrucao } from './instrucao.class';

export class Escolaridade {
  instrucao: Instrucao = new Instrucao();
  instituicaoEnsino: String[] = [];
  anoConclusao: String[] = [];
  proprietarioId: Number;
}
