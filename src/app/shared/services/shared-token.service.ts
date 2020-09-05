import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedTokenService {
  private readonly token = 'token';

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return localStorage.getItem(this.token);
  }
}
