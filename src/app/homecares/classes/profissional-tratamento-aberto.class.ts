import { Especialidade } from 'src/app/classes/especialidade.class';

export class ProfissionalTratamentoAberto {
  id: number;
  cpf: string;
  nome: string;
  sobrenome: string;
  conselho: string;
  registro: string;
  celular: string;
  especialidades: Array<Especialidade>;
}
