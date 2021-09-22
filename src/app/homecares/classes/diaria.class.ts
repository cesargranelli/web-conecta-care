export class Diaria {
  inicio: Date;
  fim: Date;
  quantidade: number;

  constructor(_inicio: Date, _fim: Date, _quantidade: number) {
    this.inicio = _inicio;
    this.fim = _fim;
    this.quantidade = _quantidade;
  }
}
