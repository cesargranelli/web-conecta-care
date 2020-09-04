import { Injectable } from '@angular/core';
import { Valid } from 'src/app/services/feat/Valid';

@Injectable({
  providedIn: 'root'
})
export class SharedValidService {
  private readonly valid = 'valid';

  isValidate() {
    return !!this.getValid();
  }

  getValid(): Valid {
    return JSON.parse(window.localStorage.getItem(this.valid));
  }
}
