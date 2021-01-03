import {Estado} from "../../classes/estado.class";

export class EnderecoPaciente {
  id: number;
  cep: string;
  logradouro: string;
  numero: number;
  bairro: string;
  cidade: string;
  complemento: string;
  fotoComprovanteEndereco: string;
  estado: Estado;
}
