import { Injectable } from '@angular/core';
import { Endereco } from 'src/app/classes/endereco.class';
import { ContatoPlanoSaude } from '../classes/contato-plano-saude.class';
import { PlanoSaude } from '../classes/plano-saude.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroPlanosSaudeService {
  public planoSaude: PlanoSaude;
  public endereco: Endereco;
  public contato: ContatoPlanoSaude;
}
