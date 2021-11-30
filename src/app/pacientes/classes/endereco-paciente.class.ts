import { Pais } from 'src/app/classes/pais.class';
import { Estado } from "../../classes/estado.class";

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
