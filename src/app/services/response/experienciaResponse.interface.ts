import {Experiencia} from '../../classes/experiencia.class';

export interface ExperienciaResponseInterface {
  data: Array<Experiencia>,
  status: number,
  success: boolean
}
