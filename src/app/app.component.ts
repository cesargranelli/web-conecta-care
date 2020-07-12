import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { SharedEventTokenService } from './shared/services/shared-event-token.service';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loading: boolean = false;
  public token: boolean = false;

  constructor(
    private _loading: SharedLoadingService,
    private _token: SharedEventTokenService,
    private _tokenService: TokenService
  ) {
    console.log(environment.name); // Logs false for default environment
    this._loading.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);
    this._token.changeEmitted$.subscribe(eventLoading => this.token = eventLoading);
    this.token = this._tokenService.hasToken();
  }

  title = 'web-connecta';

}
