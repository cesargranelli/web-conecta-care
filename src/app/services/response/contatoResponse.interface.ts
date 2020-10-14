import {Contato} from '../../classes/contato.class';

export interface ContatoResponseInterface {
  data: Contato,
  status: number,
  success: boolean
}
