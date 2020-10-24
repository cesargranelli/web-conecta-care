import {Injectable} from '@angular/core';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedEventValidService} from './shared-event-valid.service';

@Injectable({
  providedIn: 'root'
})
export class SharedValidService {
  private readonly key = 'valid';

  constructor(
    private _eventValid: SharedEventValidService
  ) {
  }

  isValidate() {
    return !!this.getValid();
  }

  getValid(): Valid {
    return JSON.parse(localStorage.getItem(this.key));
  }

  setValid(valid: Valid) {
    localStorage.setItem(this.key, JSON.stringify(valid));
    this._eventValid.emitChange(true);
  }

  removeValid() {
    localStorage.removeItem(this.key);
    this._eventValid.emitChange(false);
  }
}
