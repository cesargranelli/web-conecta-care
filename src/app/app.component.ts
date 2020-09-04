import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { Role } from './enums/role.enum';
import { Valid } from './services/feat/Valid';
import { SharedEventTokenService } from './shared/services/shared-event-token.service';
import { SharedEventValidService } from './shared/services/shared-event-valid.service';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { SharedValidService } from './shared/services/shared-valid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'web-connecta';
  public loading: boolean = false;
  public role: Role;

  constructor(
    private _loading: SharedLoadingService,
    private _tokenEvent: SharedEventTokenService,
    private _validEvent: SharedEventValidService,
    private _valid: SharedValidService
  ) {
    console.log(environment.name); // Logs false for default environment
    this._loading.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);
    this._tokenEvent.changeEmitted$.subscribe(() => this._valid.getValid());
    this._validEvent.changeEmitted$.subscribe(() => this._valid.getValid());
  }

  get login(): boolean {
    return this._valid.isValidate();
  }

  get storageValid(): any {
    return this._valid.getValid();
  }

}
