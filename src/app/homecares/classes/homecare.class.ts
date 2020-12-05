import {AreaAtendimento} from '../../classes/area-atendimento.class';

export class HomeCare {
  id: number;
  nome: string;
  cnpj: string;
  site: string;
  tipoDocumento: string;
  especialidades: Array<AreaAtendimento>;
}
