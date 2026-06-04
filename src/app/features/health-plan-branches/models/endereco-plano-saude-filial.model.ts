import { Estado } from 'src/app/core/models/estado.class';
import { Pais } from 'src/app/core/models/pais.class';

export class EnderecoPlanoSaudeFilial {
  id: number;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cidade: string;
  cep: string;
  comprovante: any;
  estado: Estado;
  pais: Pais;
  idPlanoSaude: number;
}
