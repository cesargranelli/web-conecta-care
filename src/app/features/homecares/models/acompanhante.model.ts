import { ContatoAcompanhante } from './contato-acompanhante.model';
import { Genero } from './genero.model';
import { Parentesco } from './parentesco.model';

export class Acompanhante {
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  genero: Genero;
  parentesco: Parentesco;
  contato: ContatoAcompanhante;
}
