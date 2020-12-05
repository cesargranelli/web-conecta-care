import { Injectable } from '@angular/core';
import { EnderecoPlanoSaude } from 'src/app/planos-saude/classes/endereco-plano-saude.class';
import { ContatoPlanoSaude } from '../classes/contato-plano-saude.class';
import { PlanoSaude } from '../classes/plano-saude.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroPlanosSaudeService {
  public planoSaude: PlanoSaude = new PlanoSaude();
  public endereco: EnderecoPlanoSaude = new EnderecoPlanoSaude();
  public contato: ContatoPlanoSaude = new ContatoPlanoSaude();
}
