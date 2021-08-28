import { ProntuarioAtendimento as AtendimentoProntuario } from './atendimento-prontuario.class';
import { ProfissionalProntuario } from './profissional-prontuario.class';
import { SituacaoProntuario } from './situacao-prontuario.class';

export class Tratamento {
  id: number;
  descricao: string;
  profissional: ProfissionalProntuario;
  atendimentos: AtendimentoProntuario; //TODO
  situacao: SituacaoProntuario;
}
