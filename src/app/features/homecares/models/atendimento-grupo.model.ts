import { AtendimentoModelo } from './atendimento-modelo.model';
import { AtendimentoSubgrupo } from './atendimento-subgrupo.model';

export class AtendimentoGrupo {
  id: number;
  descricao: string;
  subgrupo: AtendimentoSubgrupo[];
  modelo: AtendimentoModelo;
}
