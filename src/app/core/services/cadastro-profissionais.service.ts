import { Injectable } from '@angular/core';
import { Carreira } from '../models/carreira.class';
import { Complemento } from '../models/complemento.class';
import { Conta } from '../models/conta.class';
import { Contato } from '../models/contato.class';
import { Endereco } from '../models/endereco.class';
import { Escolaridade } from '../models/escolaridade.class';
import { Experiencia } from '../models/experiencia.class';
import { Profissional } from '../models/profissional.class';

@Injectable({ providedIn: 'root' })
export class CadastroProfissionaisService {
  public profissional: Profissional;
  public endereco: Endereco;
  public carreira: Carreira;
  public experiencia: Experiencia[];
  public escolaridade: Escolaridade;
  public contato: Contato;
  public complemento: Complemento;
  public conta: Conta;
}
