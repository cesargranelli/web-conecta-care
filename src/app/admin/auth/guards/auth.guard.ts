import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/admin/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) { }

  canActivate() {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/admin/eventos']);
    }
    return !this._authService.isLoggedIn();
  }

}
