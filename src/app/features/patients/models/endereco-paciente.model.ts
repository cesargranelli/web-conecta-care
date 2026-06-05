import { Pais } from 'src/app/core/models/pais.class';
import { Estado } from 'src/app/core/models/estado.class';

export class EnderecoPaciente {
  idPaciente: number;
  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  complemento: string;
  fotoComprovante: string;
  estado: Estado;
  pais: Pais;
}
