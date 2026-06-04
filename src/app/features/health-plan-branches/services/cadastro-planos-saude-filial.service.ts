import { Injectable } from '@angular/core';
import { ContatoPlanoSaudeFilial } from 'src/app/features/health-plan-branches/models/contato-plano-saude-filial.model';
import { EnderecoPlanoSaudeFilial } from 'src/app/features/health-plan-branches/models/endereco-plano-saude-filial.model';
import { PlanoSaudeFilial } from 'src/app/features/health-plan-branches/models/plano-saude-filial.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroPlanosSaudeFilialService {
  public planoSaude: PlanoSaudeFilial = new PlanoSaudeFilial();
  public endereco: EnderecoPlanoSaudeFilial = new EnderecoPlanoSaudeFilial();
  public contato: ContatoPlanoSaudeFilial = new ContatoPlanoSaudeFilial();
}
