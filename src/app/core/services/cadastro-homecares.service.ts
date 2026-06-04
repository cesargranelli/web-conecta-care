import { Injectable } from '@angular/core';
import { ContatoHomeCare } from 'src/app/features/homecares/models/contato-homecare.model';
import { EnderecoHomeCare } from 'src/app/features/homecares/models/endereco-homecare.model';
import { HomeCare } from 'src/app/features/homecares/models/homecare.model';

@Injectable({ providedIn: 'root' })
export class CadastroHomeCaresService {
  public homeCare: HomeCare = new HomeCare();
  public endereco: EnderecoHomeCare = new EnderecoHomeCare();
  public contato: ContatoHomeCare = new ContatoHomeCare();
}
