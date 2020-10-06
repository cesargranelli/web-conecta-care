import { Injectable } from '@angular/core';
import { Conta } from 'src/app/classes/conta.class';
import { Endereco } from 'src/app/classes/endereco.class';
import { HomeCare } from 'src/app/classes/homecare.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroHomeCaresService {
  public homeCare: HomeCare;
  public endereco: Endereco;
  public conta: Conta;
}
