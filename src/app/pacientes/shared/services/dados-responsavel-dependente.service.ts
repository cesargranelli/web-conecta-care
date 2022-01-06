import { Injectable } from '@angular/core';
import { Responsavel } from '../../classes/responsavel.class';

@Injectable({
  providedIn: 'root',
})
export class DadosResponsavelDependenteService {
  public responsavel: Responsavel = new Responsavel();
}