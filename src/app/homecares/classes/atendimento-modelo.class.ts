import { AtendimentoGrupo } from './atendimento-grupo.class';

export class AtendimentoModelo {
  id: number;
  descricao: string;
  grupos: AtendimentoGrupo[] = new Array<AtendimentoGrupo>();
}
