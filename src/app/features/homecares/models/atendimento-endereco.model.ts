import { Estado } from 'src/app/core/models/estado.class';

export class AtendimentoEndereco {
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  estado: Estado;
}
