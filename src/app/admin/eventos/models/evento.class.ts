import { Especialidade } from 'src/app/classes/especialidade.class';
import { Estado } from 'src/app/classes/estado.class';
import { StatusEvento } from 'src/app/enums/status-evento.enum';

export class Evento {
  id: number;
  titulo: string;
  descricao: string;
  detalhe: string;
  local: string;
  data: string;
  hora: string;
  duracao: number;
  vagas: number;
  estado: Estado;
  especialidades: Especialidade[];
  status: any;
}
