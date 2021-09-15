import { Atendimento as Atendimento } from './atendimento-prontuario.class';
import { ProfissionalProntuario } from './profissional-prontuario.class';
import { SituacaoProntuario } from './situacao-prontuario.class';

export class TratamentoProntuario {
  id: number;
  descricao: string;
  profissional: ProfissionalProntuario;
  atendimentos: Array<Atendimento>; //TODO
  situacao: SituacaoProntuario;
}
