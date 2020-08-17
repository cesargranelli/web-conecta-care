import { Especialidade } from 'src/app/classes/especialidade.class';
import { Estado } from './../../../classes/estado.class';

export class Evento {
  titulo: string;
  descricao: string;
  local: string;
  data: string;
  hora: string;
  estado: Estado;
  especialidades: Especialidade[]
}
