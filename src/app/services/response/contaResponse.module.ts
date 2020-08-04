import {Conta} from '../../classes/conta.class';

export interface ContaResponse {
  data: Conta,
  status: number,
  success: boolean
}
