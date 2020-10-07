import { Injectable } from '@angular/core';
import { Endereco } from 'src/app/classes/endereco.class';
import { HomeCare } from 'src/app/classes/homecare.class';
import { ContatoHomeCare } from '../classes/contatoHomeCare.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroHomeCaresService {
  public homeCare: HomeCare;
  public endereco: Endereco;
  public contato: ContatoHomeCare;
}
