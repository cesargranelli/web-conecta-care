import { AtendimentoModelo } from './atendimento-modelo.class';
import { AtendimentoSubgrupo } from './atendimento-subgrupo.class';

export class AtendimentoGrupo {
  id: number;
  descricao: string;
  subgrupo: AtendimentoSubgrupo[];
  modelo: AtendimentoModelo;
}
