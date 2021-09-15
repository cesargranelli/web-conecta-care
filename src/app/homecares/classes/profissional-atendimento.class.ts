import { Especialidade } from 'src/app/classes/especialidade.class';

export class ProfissionalAtendimento {
  id: number;
  cpf: string;
  nome: string;
  sobrenome: string;
  foto: any;
  conselho: string;
  conselhoNumero: string;
  conselhoUf: string;
  registro: string;
  especialidades: Especialidade[];
  celular: string;
}
