import { Estado } from './estado.class';

export class Endereco {
  logradouro: String;
  numero: Number;
  complemento: String;
  bairro: String;
  cidade: String;
  cep: String;
  comprovante: [];
  estado: Estado;
  proprietarioId: Number;
}
