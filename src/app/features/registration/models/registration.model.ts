import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Role } from 'src/app/core/enums/role.enum';

export type DocumentType = 'CPF' | 'CNPJ';

export interface Profile {
  id: string;        // route segment: pacientes | profissionais | homecares | planos-saude
  label: string;
  icon: string;
  module: Modulo;
  role: Role;
  docType: DocumentType;
  docMask: string;
  docPlaceholder: string;
}

export const PROFILES: Profile[] = [
  {
    id: 'pacientes',
    label: 'Paciente',
    icon: '🧑‍⚕️',
    module: Modulo.Paciente,
    role: Role.Paciente,
    docType: 'CPF',
    docMask: '000.000.000-00',
    docPlaceholder: '000.000.000-00',
  },
  {
    id: 'profissionais',
    label: 'Profissional de Saúde',
    icon: '👨‍⚕️',
    module: Modulo.Profissional,
    role: Role.Profissional,
    docType: 'CPF',
    docMask: '000.000.000-00',
    docPlaceholder: '000.000.000-00',
  },
  {
    id: 'homecares',
    label: 'Officer Homecare',
    icon: '🏠',
    module: Modulo.Homecare,
    role: Role.Homecare,
    docType: 'CNPJ',
    docMask: '00.000.000/0000-00',
    docPlaceholder: '00.000.000/0000-00',
  },
  {
    id: 'planos-saude',
    label: 'Officer Plano de Saúde',
    icon: '🏥',
    module: Modulo.PlanoSaude,
    role: Role.PlanoSaude,
    docType: 'CNPJ',
    docMask: '00.000.000/0000-00',
    docPlaceholder: '00.000.000/0000-00',
  },
];

export interface RegistrationPayload {
  document: { number: string; type: DocumentType; module: Modulo };
  credentials: { email: string; password: string; role: Role; sequence: number };
}

export type RegistrationStep = 'profile' | 'document' | 'credentials';
