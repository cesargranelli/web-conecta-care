import { Component } from '@angular/core';
import { environment } from './../environments/environment';
import { Modulo } from './enums/modulo.enum';
import { Valid } from './services/feat/Valid';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { SharedValidService } from './shared/services/shared-valid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public chave: string;
  public title = 'web-connecta';
  public loading: boolean = false;
  public versaoPublicada: string = '1.14.0';

  constructor(
    private _loading: SharedLoadingService,
    private _valid: SharedValidService
  ) {
    this.isHomePage;
    console.log(environment.name + ' - ' + this.versaoPublicada); // Logs false for default environment
    this._loading.changeEmitted$.subscribe(eventLoading => this.loading = eventLoading);

    this.chave = this._valid.getValid() ? null : Modulo.Paciente;
  }

  get login(): boolean {
    return this._valid.isValidate(this.chave);
  }

  get storageValid(): any {
    return this._valid.getValid(this.chave);
  }

  get isHomePage(): boolean {
    return window.location.pathname === '/home';
  }

  get roleValid(): string {
    return this._valid.getValid(this.chave)?.role;
  }

  get statusValid(): string {
    return this._valid.getValid(this.chave)?.status;
  }

}
