import { Component } from '@angular/core';
import { Modulo } from './enums/modulo.enum';
import { Valid } from './services/feat/Valid';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { SharedValidService } from './shared/services/shared-valid.service';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  readonly title = 'web-connecta';
  loading = false;

  constructor(
    private _loading: SharedLoadingService,
    private _valid: SharedValidService,
  ) {
    this._loading.changeEmitted$.subscribe(v => this.loading = v);
  }

  get isHomePage(): boolean {
    return window.location.pathname === '/home';
  }

  /** Returns the first Valid found across all modules, or null if unauthenticated. */
  get activeValid(): Valid | null {
    const modules: Array<Modulo | string> = [
      Modulo.Paciente, Modulo.Profissional, Modulo.Homecare,
      Modulo.PlanoSaude, Modulo.Root, 'valid',
    ];
    return modules.map(m => this._valid.getValid(m as string)).find(v => !!v) ?? null;
  }
}
