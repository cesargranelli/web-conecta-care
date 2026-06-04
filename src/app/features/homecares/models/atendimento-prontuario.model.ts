import { SituacaoAtendimento } from './situacao-atendimento.model';

export class Atendimento {
  id: number;
  data: Date;
  hora: Date;
  nomeProfissional: string;
  situacao: SituacaoAtendimento;
  descricaoProcedimento: string;
  descricaoMedicamento: string;
  descricaoEquipamento: string;
}
