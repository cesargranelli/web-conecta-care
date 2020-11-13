import { AreaAtendimento } from './area-atendimento.class';

export class PlanoSaude {
  id: number;
  nome: string;
  cnpj: string;
  site: string;
  tipoDocumento: string;
  especialidades: Array<AreaAtendimento>;
}
