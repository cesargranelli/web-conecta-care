import { TipoPaciente } from "./tipo-paciente.model";
import { EstadoCivil } from 'src/app/core/models/estado-civil.class';
import { Genero } from 'src/app/core/models/genero.class';
import { ContatoPaciente } from "./contato-paciente.model";
import { EnderecoPaciente } from "./endereco-paciente.model";
import { HistoricoMedicoPaciente } from "./historico-medico-paciente.model";

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
