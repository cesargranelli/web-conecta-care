import { Injectable } from '@angular/core';

const KEY = 'auth';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  hasToken() {
    return !!window.localStorage.getItem(KEY);
  }

  setToken(token: string) {
    window.localStorage.setItem(KEY, token);
  }

  getToken(): string {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
  }

}
