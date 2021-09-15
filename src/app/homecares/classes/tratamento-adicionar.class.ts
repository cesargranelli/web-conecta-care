import { Acompanhante } from './acompanhante.class';
import { SituacaoTratamento } from './situacao-tratamento.class';

export class TratamentoAdicionar {
  descricao: string;
  valorKilometragem: number;
  pacienteId: number;
  acompanhante: Acompanhante;
  profissionalId: number;
  homeCareId: number;
  situacao: SituacaoTratamento;
}
