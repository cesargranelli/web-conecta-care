import { AreaAtendimento } from './area-atendimento.class';
import { Conselho } from './conselho.class';
import { Estado } from './estado.class';
import { Transporte } from './transporte.class';

export class Carreira {
  conselho: Conselho;
  registroProfissional: Number;
  ufConselho: Estado;
  areaAtendimento: AreaAtendimento[];
  nomeReferencia1: String;
  nomeReferencia2: String;
  telefoneReferencia1: String;
  telefoneReferencia2: String;
  transporte: Transporte;
  proprietarioId: Number;
}
