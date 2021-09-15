import { Genero } from 'src/app/classes/genero.class';
import { Parentesco } from 'src/app/classes/parentesco.class';
import { ContatoPaciente } from 'src/app/pacientes/classes/contato-paciente.class';

export class AcompanhanteTratamentoAberto {
  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: string;
  genero: Genero;
  parentesco: Parentesco;
  contato: ContatoPaciente;
}


