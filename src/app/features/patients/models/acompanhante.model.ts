import {Genero} from 'src/app/core/models/genero.class';
import {ContatoPaciente} from './contato-paciente.model';
import {Parentesco} from './parentesco.model';

export class Acompanhante {
  id: number;
  nomeCompleto: string;
  cpf: string;
  dataNascimento: string;
  genero: Genero;
  parentesco: Parentesco;
  contato: ContatoPaciente;
}


