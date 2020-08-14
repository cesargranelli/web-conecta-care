import {Profissional} from '../../classes/profissional.class';

export interface ProfissionalResponseInterface {
  data: Profissional,
  status: number,
  success: boolean
}
