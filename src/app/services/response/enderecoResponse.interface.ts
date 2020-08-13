import {Endereco} from '../../classes/endereco.class';

export interface EnderecoResponseInterface {
  data: Endereco,
  status: number,
  success: boolean
}
