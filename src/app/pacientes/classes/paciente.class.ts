import { TipoPaciente } from "./tipo-paciente.class";
import { EstadoCivil } from "../../classes/estado-civil.class";
import { Genero } from "../../classes/genero.class";
import { ContatoPaciente } from "./contato-paciente.class";
import { EnderecoPaciente } from "./endereco-paciente.class";
import { HistoricoMedicoPaciente } from "./historico-medico-paciente.class";

export class Paciente {

  id: number;
  nome: string;
  sobrenome: string;
  cpf: string;
  dataNascimento: string;
  rg: string;
  rgEmissor: string;
  rgDataEmissao: string;
  foto: string | ArrayBuffer;
  fotoRg: string | ArrayBuffer;
  fotoCpf: string | ArrayBuffer;
  genero: Genero;
  estadoCivil: EstadoCivil;
  endereco: EnderecoPaciente;
  contato: ContatoPaciente;
  historicoMedico: HistoricoMedicoPaciente;
  titularId: number;
  modulo: string;
  responsavelCadastroId: number;
  tipoPaciente: TipoPaciente;
}
