import { Injectable } from '@angular/core';
import { Responsavel } from 'src/app/features/patients/models/responsavel.model';

@Injectable({
  providedIn: 'root',
})
export class DadosResponsavelDependenteService {
  public responsavel: Responsavel = new Responsavel();
}