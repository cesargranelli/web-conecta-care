import { CategoriaCNH } from './categoria-cnh.class';

export class Complemento {
  tituloEleitoral: Number;
  zonaEleitoral: String;
  secaoEleitoral: String;
  numeroHabilitacao: Number;
  dataValidadeHabilitacao: Date;
  categoriaCNH: CategoriaCNH;
  fotoCNH: String;
  numeroReservista: Number;
  nomeMae: String;
  profissaoMae: String;
  nomePai: String;
  profissaoPai: String;
  nomeConjuge: String;
  profissaoConjuge: String;
  filhos: String[];
  carteiraVacinacao: Boolean;
  proprietarioId: Number;
}
