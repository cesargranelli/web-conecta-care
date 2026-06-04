import { AreaAtendimento } from 'src/app/core/models/area-atendimento.class';

export class PlanoSaude {
  id: number;
  nome: string;
  cnpj: string;
  anoFundacao: number;
  tipoDocumento: string;
  especialidades: Array<AreaAtendimento>;
}
