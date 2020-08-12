import {Complemento} from '../../classes/complemento.class';

export interface ComplementoResponseInterface {
  data: Complemento,
  status: number,
  success: boolean
}
