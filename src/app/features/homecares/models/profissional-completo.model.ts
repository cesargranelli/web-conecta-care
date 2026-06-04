import { Carreira } from "src/app/models/carreira.class";
import { Complemento } from "src/app/models/complemento.class";
import { Conta } from "src/app/models/conta.class";
import { Contato } from "src/app/models/contato.class";
import { Endereco } from "src/app/models/endereco.class";
import { Escolaridade } from "src/app/models/escolaridade.class";
import { Experiencia } from "src/app/models/experiencia.class";
import { Profissional } from "src/app/models/profissional.class";

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
