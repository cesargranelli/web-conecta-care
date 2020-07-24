import { Injectable } from '@angular/core';
import { Valid } from 'src/app/services/feat/Valid';

const KEY = 'valid';

@Injectable({
  providedIn: 'root'
})
export class ValidService {

  hasValid() {
    return !!window.localStorage.getItem(KEY);
  }

  setValid(valid: Valid) {
    window.localStorage.setItem(KEY, JSON.stringify(valid));
  }

  getValid(): Valid {
    return JSON.parse(window.localStorage.getItem(KEY));
  }

  removeValid() {
    window.localStorage.removeItem(KEY);
  }

}
