import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthAdminService } from 'src/app/admin/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private _authService: AuthAdminService, private _router: Router) { }

  canActivate() {
    if (this._authService.isLoggedIn()) {
      this._router.navigate(['/admin/eventos']);
    }
    return !this._authService.isLoggedIn();
  }

}
