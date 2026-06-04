import { Injectable } from '@angular/core';
import { Responsavel } from 'src/app/core/models/responsavel.model';

@Injectable({
  providedIn: 'root',
})
export class DadosResponsavelDependenteService {
  public responsavel: Responsavel = new Responsavel();
}