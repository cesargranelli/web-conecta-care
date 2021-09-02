import { ContatoAcompanhante } from './contato-acompanhante.class';
import { Genero } from './genero.class';
import { Parentesco } from './parentesco.class';

export class Acompanhante {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: Date;
  genero: Genero;
  parentesco: Parentesco;
  contato: ContatoAcompanhante;
}
