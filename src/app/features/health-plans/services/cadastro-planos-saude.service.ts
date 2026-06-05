import { Injectable } from '@angular/core';
import { EnderecoPlanoSaude } from 'src/app/features/health-plans/models/endereco-plano-saude.model';
import { ContatoPlanoSaude } from 'src/app/features/health-plans/models/contato-plano-saude.model';
import { PlanoSaude } from 'src/app/features/health-plans/models/plano-saude.model';

@Injectable({
  providedIn: 'root'
})
export class CadastroPlanosSaudeService {
  public planoSaude: PlanoSaude = new PlanoSaude();
  public endereco: EnderecoPlanoSaude = new EnderecoPlanoSaude();
  public contato: ContatoPlanoSaude = new ContatoPlanoSaude();
}
