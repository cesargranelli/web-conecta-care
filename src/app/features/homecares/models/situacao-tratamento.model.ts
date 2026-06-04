export class SituacaoTratamento {
  observacao: string;
  dataHora: string;
  status: string;

  constructor(observacao: string, dataHora: string, status: string) {
    this.observacao = observacao;
    this.dataHora = dataHora;
    this.status = status;
  }

}
