import { Genero } from 'src/app/core/models/genero.class';
import { Parentesco } from 'src/app/core/models/parentesco.class';
import { ContatoPaciente } from 'src/app/features/patients/models/contato-paciente.model';

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


