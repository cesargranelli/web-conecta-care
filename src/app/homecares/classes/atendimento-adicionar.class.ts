import { Time } from '@angular/common';
import { AtendimentoEndereco } from './atendimento-endereco.class';
import { AtendimentoGrupo } from './atendimento-grupo.class';
import { AtendimentoRecorrencia } from './atendimento-recorrencia.class';
import { SituacaoAtendimento } from './situacao-atendimento.class';

export class AtendimentoAdicionar {
  homeCareId: number;
  tratamentoId: number;
  profissionalId: number;
  plantonistaId: number;
  acompanhanteId: number;
  pacienteId: number;
  data: Date;
  hora: Time;
  endereco: AtendimentoEndereco;
  valorHomeCare: number;
  valorProfissional: number;
  valorPaciente: number;
  valorAjudaCusto: number;
  observacao: string;
  grupos: Array<AtendimentoGrupo>;
  situacao: SituacaoAtendimento;
  recorrencia: AtendimentoRecorrencia;
}
