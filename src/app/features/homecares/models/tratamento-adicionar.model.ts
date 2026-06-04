import { Acompanhante } from './acompanhante.model';
import { SituacaoTratamento } from './situacao-tratamento.model';

export class TratamentoAdicionar {
  descricao: string;
  valorKilometragem: number;
  pacienteId: number;
  acompanhante: Acompanhante;
  profissionalId: number;
  homeCareId: number;
  situacao: SituacaoTratamento;
}
