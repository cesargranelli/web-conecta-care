import { Injectable } from '@angular/core';
import { Conta } from 'src/app/classes/conta.class';
import { Endereco } from 'src/app/classes/endereco.class';
import { Homecare } from '../classes/homecare.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroHomecaresService {
  public homecare: Homecare;
  public endereco: Endereco;
  public conta: Conta;
}
