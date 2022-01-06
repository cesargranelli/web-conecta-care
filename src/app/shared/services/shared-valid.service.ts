import {Injectable} from '@angular/core';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedEventValidService} from './shared-event-valid.service';

@Injectable({
  providedIn: 'root'
})
export class SharedValidService {
  private readonly key = 'valid';

  constructor(private _eventValid: SharedEventValidService) { }

  isValidate(chave?: string) {
    return !!this.getValid(chave != null ? chave : this.key);
  }

  getValid(chave?: string): Valid {
    return JSON.parse(localStorage.getItem(chave != null ? chave : this.key));
  }

  setValid(valid: Valid) {
    localStorage.setItem(valid.modulo != null ? valid.modulo : this.key, JSON.stringify(valid));
    this._eventValid.emitChange(true);
  }

  removeValid(chave?: string) {
    localStorage.removeItem(chave != null ? chave : this.key);
    this._eventValid.emitChange(false);
  }
}
