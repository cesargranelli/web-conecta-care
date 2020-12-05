import { Estado } from 'src/app/classes/estado.class';
import { Pais } from 'src/app/classes/pais.class';

export class EnderecoPlanoSaude {
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
