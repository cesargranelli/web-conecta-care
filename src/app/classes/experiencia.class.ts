export class Experiencia {
  posicao: number;
  empresa: string;
  cargo: string;
  dataAdmissao: EstruturaData;
  dataDemissao: EstruturaData;
  observacao: string;
  profissionalId: number;
}

class EstruturaData {
  date: string;
  timezone: string;
  timezone_type: number;
}
