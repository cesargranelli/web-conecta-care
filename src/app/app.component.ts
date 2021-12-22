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
  public versaoPublicada: string = '1.13.0';

  constructor(
    private _loading: SharedLoadingService,
    private _valid: SharedValidService
  ) {
    this.isHomePage;
    console.log(environment.name + ' - ' + this.versaoPublicada); // Logs false for default environment
    this._loading.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);
  }

  get login(): boolean {
    return this._valid.isValidate();
  }

  get storageValid(): any {
    return this._valid.getValid();
  }

  get isHomePage(): boolean {
    return window.location.pathname === '/home';
  }

  get roleValid(): string {
    return this._valid.getValid()?.role;
  }

  get statusValid(): string {
    return this._valid.getValid()?.status;
  }

}
