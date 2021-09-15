import { Endereco } from 'src/app/classes/endereco.class';
import { ContatoTratamentoAberto } from './contato-tratamento-aberto.class';

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
