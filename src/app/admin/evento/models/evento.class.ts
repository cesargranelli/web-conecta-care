import { Especialidade } from 'src/app/classes/especialidade.class';
import { Estado } from './../../../classes/estado.class';

export class Evento {
  titulo: string;
  descricao: string;
  detalhe: string;
  local: string;
  data: string;
  hora: string;
  duracao: number;
  vagas: number;
  estado: Estado;
  especialidades: Especialidade[]
}
