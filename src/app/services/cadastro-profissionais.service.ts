import {Injectable} from '@angular/core';
import {Carreira} from '../classes/carreira.class';
import {Complemento} from '../classes/complemento.class';
import {Conta} from '../classes/conta.class';
import {Contato} from '../classes/contato.class';
import {Endereco} from '../classes/endereco.class';
import {Escolaridade} from '../classes/escolaridade.class';
import {Experiencia} from '../classes/experiencia.class';
import {Profissional} from '../classes/profissional.class';

@Injectable({
  providedIn: 'root'
})
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
