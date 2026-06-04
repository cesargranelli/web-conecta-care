import {Especialidade} from 'src/app/core/models/especialidade.class';
import {Estado} from 'src/app/core/models/estado.class';

export class Evento {
  id: number;
  titulo: string;
  descricao: string;
  detalhe: string;
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  data: string;
  hora: string;
  duracao: number;
  vagas: number;
  estado: Estado;
  especialidades: Especialidade[];
  status: any;
}
