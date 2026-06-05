import { Endereco } from 'src/app/core/models/endereco.class';
import { Pais } from 'src/app/core/models/pais.class';
import { Plantonista } from './plantonista.model';
import { Acompanhante } from 'src/app/features/homecares/models/acompanhante.model';
import { AtendimentoRecorrencia } from './atendimento-recorrencia.model';
import { AtendimentoGrupo } from './atendimento-grupo.model';

export class AtendimentoDetalhes {
  id: number;
  dataHora: string;
  protocolo: string;
  observacao: string;
  endereco: Endereco;
  pais: Pais;
  plantonista: Plantonista;
  acompanhante: Acompanhante;
  profissional: { documento: string; nomeCompleto: string; };
  recorrencia: AtendimentoRecorrencia;
  valorHomeCare: string;
  valorProfissional: string;
  valorPaciente: string;
  valorAjudaCusto: string;
  grupos: AtendimentoGrupo[];
}
