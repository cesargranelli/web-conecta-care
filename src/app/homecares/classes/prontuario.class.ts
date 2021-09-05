import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { TratamentoProntuario as TratamentoProntuario } from './tratamento-prontuario.class';

export class Prontuario {
  paciente: Paciente;
  tratamentos: Array<TratamentoProntuario>;
}
