import { Paciente } from 'src/app/features/patients/models/paciente.model';
import { TratamentoProntuario as TratamentoProntuario } from './tratamento-prontuario.model';

export class Prontuario {
  paciente: Paciente;
  tratamentos: Array<TratamentoProntuario>;
}
