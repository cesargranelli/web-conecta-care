import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Valid } from 'src/app/services/feat/Valid';
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

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let valid: Valid = this._validService.getValid();
    if (this._tokenService.isLoggedIn()) {
      return this._tokenService.isLoggedIn();
    } else {
      this._router.navigate([`/login`]);
    }
  }

}
