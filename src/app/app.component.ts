import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { Modulo } from './enums/modulo.enum';
import { Valid } from './services/feat/Valid';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { SharedValidService } from './shared/services/shared-valid.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly _valid = inject(SharedValidService);

  constructor(private _loading: SharedLoadingService) {
    this._loading.changeEmitted$.subscribe();
  }

  get isHomePage(): boolean {
    return window.location.pathname === '/home';
  }

  get activeValid(): Valid | null {
    const modules: Array<string> = [
      Modulo.Paciente, Modulo.Profissional, Modulo.Homecare,
      Modulo.PlanoSaude, Modulo.Root, 'valid',
    ];
    return modules.map(m => this._valid.getValid(m)).find(v => !!v) ?? null;
  }
}
