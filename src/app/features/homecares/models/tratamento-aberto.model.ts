import { AcompanhanteTratamentoAberto } from './acompanhante-tratamento-aberto.model';
import { AtendimentoTratamentoAberto } from './atendimento-tratamento-aberto.model';
import { PacienteTratamentoAberto } from './paciente-tratamento-aberto.model';
import { ProfissionalTratamentoAberto } from './profissional-tratamento-aberto.model';
import { SituacaoTratamento } from './situacao-tratamento.model';

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
