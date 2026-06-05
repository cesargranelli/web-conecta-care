import { Carreira } from 'src/app/core/models/carreira.class';
import { Complemento } from 'src/app/core/models/complemento.class';
import { Conta } from 'src/app/core/models/conta.class';
import { Contato } from 'src/app/core/models/contato.class';
import { Endereco } from 'src/app/core/models/endereco.class';
import { Escolaridade } from 'src/app/core/models/escolaridade.class';
import { Experiencia } from 'src/app/core/models/experiencia.class';
import { Profissional } from 'src/app/core/models/profissional.class';

export class ProfissionalCompleto {
  profissional: Profissional
  endereco: Endereco;
  telefone: Contato;
  conta: Conta;
  complemento: Complemento;
  experiencia: Array<Experiencia>;
  carreira: Carreira;
  escolaridade: Escolaridade;
}
