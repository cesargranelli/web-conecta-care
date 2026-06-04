import { Atendimento as Atendimento } from './atendimento-prontuario.model';
import { ProfissionalProntuario } from './profissional-prontuario.model';
import { SituacaoProntuario } from './situacao-prontuario.model';

export class TratamentoProntuario {
  id: number;
  descricao: string;
  profissional: ProfissionalProntuario;
  atendimentos: Array<Atendimento>; //TODO
  situacao: SituacaoProntuario;
}
