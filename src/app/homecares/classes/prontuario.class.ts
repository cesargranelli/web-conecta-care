import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { Tratamento } from './tratamento.class';

export class Prontuario {
  paciente: Paciente;
  tratamentos: Array<Tratamento>;
}
