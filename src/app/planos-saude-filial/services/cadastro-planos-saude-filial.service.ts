import { Injectable } from '@angular/core';
import { ContatoPlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/contato-plano-saude-filial.class';
import { EnderecoPlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/endereco-plano-saude-filial.class';
import { PlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/plano-saude-filial.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroPlanosSaudeFilialService {
  public planoSaude: PlanoSaudeFilial = new PlanoSaudeFilial();
  public endereco: EnderecoPlanoSaudeFilial = new EnderecoPlanoSaudeFilial();
  public contato: ContatoPlanoSaudeFilial = new ContatoPlanoSaudeFilial();
}
