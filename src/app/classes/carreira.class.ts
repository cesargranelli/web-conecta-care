import {AreaAtendimento} from './area-atendimento.class';
import {Conselho} from './conselho.class';
import {Estado} from './estado.class';
import {Transporte} from './transporte.class';

export class Carreira {
  conselho: Conselho;
  registroProfissional: number;
  ufConselho: Estado;
  areasAtendimento: Array<AreaAtendimento>;
  nomeReferencia1: string;
  nomeReferencia2: string;
  telefoneReferencia1: string;
  telefoneReferencia2: string;
  transporte: Transporte;
  proprietarioId: number;
}
