import {TipoSanguineoPaciente} from "./tipo-sanguineo-paciente.class";

export class HistoricoMedicoPaciente {
  id: number;
  carteiraVacinacao: boolean;
  alergiaMedicamento: boolean;
  alergiaMedicamentoDescricao: string;
  dataUltimoTratamento: string;
  dataUltimoAtendimento: string;
  tipoSanguineo: TipoSanguineoPaciente;
  flagAceiteDeclaracao: boolean;
}
