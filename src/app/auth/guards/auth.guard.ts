import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SharedTokenService } from 'src/app/shared/services/shared-token.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { RoleConverter } from 'src/app/utils/role.converter';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private converter: RoleConverter = new RoleConverter();

  constructor(
    private _tokenService: SharedTokenService,
    private _validService: SharedValidService,
    private _router: Router
  ) { }

  canActivate() {
    if (this._tokenService.isLoggedIn() && this._validService.valid?.role.search('ADMIN') < 0) {
      let component = this.converter.toComponent(this._validService.valid.role);
      this._router.navigate([`/${component}/${this._validService.valid.id}`]);
    }
    if (this._tokenService.isLoggedIn() && this._validService.valid?.role.search('ADMIN') > 0) {
      this._router.navigate(['/admin/eventos']);
    }
    return !this._tokenService.isLoggedIn();
  }

}
