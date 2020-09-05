import { Component } from '@angular/core';
import { environment } from './../environments/environment';
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

  constructor(
    private _loading: SharedLoadingService,
    private _valid: SharedValidService
  ) {
    console.log(environment.name); // Logs false for default environment
    this._loading.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);
  }

  get login(): boolean {
    return this._valid.validate;
  }

  get storageValid(): any {
    return this._valid.valid;
  }

}
