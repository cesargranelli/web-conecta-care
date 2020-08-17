import { Estado } from './estado.class';
import { Pais } from './pais.class';

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  comprovante: any;
  estado: Estado;
  pais: Pais;
  proprietarioId: number;
}
