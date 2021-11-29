import { Endereco } from '../../classes/endereco.class';
import { Pais } from '../../classes/pais.class';
import { Plantonista } from './plantonista.class';
import { Acompanhante } from '../../pacientes/classes/acompanhante.class';
import { AtendimentoRecorrencia } from './atendimento-recorrencia.class';
import { AtendimentoGrupo } from './atendimento-grupo.class';

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
