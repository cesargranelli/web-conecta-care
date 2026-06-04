import { inject, Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { SharedEventTokenService } from './shared-event-token.service';

@Injectable({ providedIn: 'root' })
export class SharedTokenService {
  private readonly key = 'token';
  private readonly storage = inject(StorageService);
  private readonly _eventToken = inject(SharedEventTokenService);

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return this.storage.get<string>(this.key);
  }

  setToken(token: string): void {
    this.storage.set(this.key, token);
    this._eventToken.emitChange(true);
  }

  removeToken(): void {
    this.storage.remove(this.key);
    this._eventToken.emitChange(false);
  }
}
