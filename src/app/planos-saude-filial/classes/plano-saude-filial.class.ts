import { AreaAtendimento } from '../../classes/area-atendimento.class';
import { PlanoSaude } from 'src/app/planos-saude/classes/plano-saude.class';

export class PlanoSaudeFilial {
  id: number;
  nome: string;
  cnpj: string;
  anoFundacao: number;
  tipoDocumento: string;
  especialidades: Array<AreaAtendimento>;
  planoSaudeMatriz: PlanoSaude
}
