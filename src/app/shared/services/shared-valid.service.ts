import { inject, Injectable } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { Valid } from 'src/app/core/models/Valid';
import { SharedEventValidService } from './shared-event-valid.service';

@Injectable({ providedIn: 'root' })
export class SharedValidService {
  private readonly key = 'valid';
  private readonly storage = inject(StorageService);
  private readonly _eventValid = inject(SharedEventValidService);

  isValidate(chave?: string): boolean {
    return !!this.getValid(chave);
  }

  getValid(chave?: string): Valid | null {
    return this.storage.get<Valid>(chave ?? this.key);
  }

  setValid(valid: Valid): void {
    this.storage.set(valid.modulo ?? this.key, valid);
    this._eventValid.emitChange(true);
  }

  removeValid(chave?: string): void {
    this.storage.remove(chave ?? this.key);
    this._eventValid.emitChange(false);
  }
}
