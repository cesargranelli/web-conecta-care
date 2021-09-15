import { Injectable } from '@angular/core';
import { TratamentoAberto } from '../classes/tratamento-aberto.class';

@Injectable({
  providedIn: 'root'
})
export class TratamentoStorageService {

  public tratamentoAberto: TratamentoAberto;

}
