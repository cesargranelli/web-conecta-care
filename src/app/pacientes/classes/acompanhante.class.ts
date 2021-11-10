import {Genero} from '../../classes/genero.class';
import {ContatoPaciente} from './contato-paciente.class';
import {Parentesco} from './parentesco.class';

export class Acompanhante {
  id: number;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  genero: Genero;
  parentesco: Parentesco;
  contato: ContatoPaciente;
}


