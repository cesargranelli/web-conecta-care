import { Time } from '@angular/common';
import { AtendimentoEndereco } from './atendimento-endereco.model';
import { AtendimentoGrupo } from './atendimento-grupo.model';
import { AtendimentoRecorrencia } from './atendimento-recorrencia.model';
import { SituacaoAtendimento } from './situacao-atendimento.model';
import { TipoAtendimento } from './tipo-atendimento.model';

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
  tipoAtendimento: TipoAtendimento;
}
