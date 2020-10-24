import {Banco} from './banco.class';
import {TipoConta} from './tipo-conta.class';

export class Conta {
  tipo: TipoConta;
  banco: Banco;
  agencia: String;
  numero: String;
  digito: String;
  proprietarioId: number;
}
