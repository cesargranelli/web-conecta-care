import {Injectable} from '@angular/core';
import {SharedEventTokenService} from './shared-event-token.service';

@Injectable({
  providedIn: 'root'
})
export class SharedTokenService {
  private readonly key = 'token';

  constructor(
    private _eventToken: SharedEventTokenService
  ) {
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(this.key);
  }

  setToken(token: string) {
    localStorage.setItem(this.key, token);
    this._eventToken.emitChange(true);
  }

  removeToken() {
    localStorage.removeItem(this.key);
    this._eventToken.emitChange(false);
  }
}
