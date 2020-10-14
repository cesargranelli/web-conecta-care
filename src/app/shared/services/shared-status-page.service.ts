import { Injectable } from '@angular/core';

const KEY = 'status';

@Injectable({
  providedIn: 'root'
})
export class SharedStatusPageService {

  hasLoadControl() {
    return !!window.localStorage.getItem(KEY);
  }

  setLoadControl(status: string) {
    window.localStorage.setItem(KEY, status);
  }

  removeLoadControl() {
    window.localStorage.removeItem(KEY);
  }

}

