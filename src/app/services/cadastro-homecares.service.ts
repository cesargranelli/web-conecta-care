import { Injectable } from '@angular/core';
import { ContatoHomeCare } from 'src/app/homecares/classes/contato-homecare.class';
import { EnderecoHomeCare } from 'src/app/homecares/classes/endereco-homecare.class';
import { HomeCare } from 'src/app/homecares/classes/homecare.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroHomeCaresService {
  public homeCare: HomeCare = new HomeCare();
  public endereco: EnderecoHomeCare = new EnderecoHomeCare();
  public contato: ContatoHomeCare = new ContatoHomeCare();
}
