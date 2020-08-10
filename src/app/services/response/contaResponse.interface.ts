import {Conta} from '../../classes/conta.class';

export interface ContaResponseInterface {
  data: Conta,
  status: number,
  success: boolean
}
