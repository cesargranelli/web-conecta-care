import { Endereco } from 'src/app/core/models/endereco.class';
import { ContatoTratamentoAberto } from './contato-tratamento-aberto.model';

export class PacienteTratamentoAberto {
  id: number;
  cpf: string;
  nome: string;
  sobrenome: string;
  dataNascimento: string;
  genero: string;
  contato: ContatoTratamentoAberto;
  estadoCivil: string;
  endereco: Endereco;
}
