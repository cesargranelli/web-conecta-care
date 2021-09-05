import { AcompanhanteTratamentoAberto } from './acompanhante-tratamento-aberto.class';
import { AtendimentoTratamentoAberto } from './atendimento-tratamento-aberto.class';
import { PacienteTratamentoAberto } from './paciente-tratamento-aberto.class';
import { ProfissionalTratamentoAberto } from './profissional-tratamento-aberto.class';
import { SituacaoTratamento } from './situacao-tratamento.class';

export class TratamentoAberto {
  id: number;
  descricao: string;
  valorKilometragem: number;
  paciente: PacienteTratamentoAberto;
  acompanhante: AcompanhanteTratamentoAberto;
  profissional: ProfissionalTratamentoAberto;
  atendimentos: AtendimentoTratamentoAberto;
  situacao: SituacaoTratamento;
}
