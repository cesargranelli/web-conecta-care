import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { AuthService } from './admin/auth/services/auth.service';
import { Role } from './enums/role.enum';
import { Valid } from './services/feat/Valid';
import { TokenService } from './services/token.service';
import { SharedEventTokenService } from './shared/services/shared-event-token.service';
import { SharedEventValidService } from './shared/services/shared-event-valid.service';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { ValidService } from './shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'web-connecta';
  public loading: boolean = false;
  public token: boolean = false;
  public valid: Valid;
  public role: Role;

  constructor(
    private _loading: SharedLoadingService,
    private _token: SharedEventTokenService,
    private _valid: SharedEventValidService,
    private _tokenService: TokenService,
    private _validService: ValidService,
    private _authService: AuthService
  ) {
    console.log(environment.name); // Logs false for default environment
    this._loading.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);
    this._token.changeEmitted$.subscribe(token => this.token = token);
    this._valid.changeEmitted$.subscribe((valid: Valid) => this.valid = valid);
    this.token = this._tokenService.hasToken();
    this.valid = this._validService.getValid();
  }

  get login(): boolean {
    return this._authService.isLoggedIn();
  }

  get storageValid(): any {
    return this._authService.getValid();
  }

}
