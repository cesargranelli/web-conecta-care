import { SituacaoAtendimento } from './situacao-atendimento.class';

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
