import { CategoriaCNH } from './categoria-cnh.class';

export class Complemento {
  tituloEleitoral: number;
  zonaEleitoral: string;
  secaoEleitoral: string;
  numeroHabilitacao: number;
  dataValidadeHabilitacao: DataValidadeHabilitacao;
  categoriaCNH: CategoriaCNH;
  fotoCNHFrente: any;
  fotoCNHVerso: any;
  numeroReservista: number;
  nomeMae: string;
  profissaoMae: string;
  nomePai: string;
  profissaoPai: string;
  nomeConjuge: string;
  profissaoConjuge: string;
  filhos: Array<string>;
  carteiraVacinacao: boolean;
  proprietarioId: number;
}

class DataValidadeHabilitacao {
  date: string;
  timezone: string;
  timezone_type: number;
}
