import { AtendimentoGrupo } from './atendimento-grupo.model';

export class AtendimentoModelo {
  id: number;
  descricao: string;
  grupos: AtendimentoGrupo[] = new Array<AtendimentoGrupo>();
}
