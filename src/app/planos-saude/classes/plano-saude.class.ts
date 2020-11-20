import { AreaAtendimento } from '../../classes/area-atendimento.class';

export class PlanoSaude {
  id: number;
  nome: string;
  cnpj: string;
  anoFundacao: number;
  tipoDocumento: string;
  especialidades: Array<AreaAtendimento>;
}
