import { Carreira } from "src/app/classes/carreira.class";
import { Complemento } from "src/app/classes/complemento.class";
import { Conta } from "src/app/classes/conta.class";
import { Contato } from "src/app/classes/contato.class";
import { Endereco } from "src/app/classes/endereco.class";
import { Escolaridade } from "src/app/classes/escolaridade.class";
import { Experiencia } from "src/app/classes/experiencia.class";
import { Profissional } from "src/app/classes/profissional.class";

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
