import { Especialidade } from 'src/app/core/models/especialidade.class';

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
