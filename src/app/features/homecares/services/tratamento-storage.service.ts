import { Injectable } from '@angular/core';
import { TratamentoAberto } from 'src/app/features/homecares/models/tratamento-aberto.model';

@Injectable({
  providedIn: 'root'
})
export class TratamentoStorageService {

  public tratamentoAberto: TratamentoAberto;

}
