import { AreaAtendimento } from 'src/app/core/models/area-atendimento.class';
import { PlanoSaude } from 'src/app/features/health-plans/models/plano-saude.model';

export class PlanoSaudeFilial {
  id: number;
  nome: string;
  cnpj: string;
  anoFundacao: number;
  tipoDocumento: string;
  especialidades: Array<AreaAtendimento>;
  planoSaudeMatriz: PlanoSaude
}
