import { Injectable } from '@angular/core';
import { Valid } from 'src/app/services/feat/Valid';

@Injectable({
  providedIn: 'root'
})
export class SharedValidService {
  private readonly key = 'valid';

  get validate() {
    return !!this.valid;
  }

  get valid(): Valid {
    return JSON.parse(window.localStorage.getItem(this.key));
  }
}
