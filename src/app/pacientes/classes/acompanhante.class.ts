import {Genero} from '../../classes/genero.class';
import {ContatoPaciente} from './contato-paciente.class';
import {Parentesco} from './parentesco.class';

export class Acompanhante {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: string;
  genero: Genero;
  parentesco: Parentesco;
  contato: ContatoPaciente;
}


