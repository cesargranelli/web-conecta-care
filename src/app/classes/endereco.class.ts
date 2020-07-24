import { Estado } from './estado.class';

export class Endereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  comprovante: string;
  estado: Estado;
  proprietarioId: number;
}
