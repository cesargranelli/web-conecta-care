import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { Modulo } from './core/enums/modulo.enum';
import { Valid } from './core/models/Valid';
import { SharedLoadingService } from './shared/services/shared-loading.service';
import { SharedValidService } from './shared/services/shared-valid.service';

const PUBLIC_ROUTES = [
  '/login', '/register', '/cadastro', '/admin/login',
  '/confirm-registration', '/confirm-password',
  '/waiting-email-confirmation', '/terms-of-use', '/privacy-policy',
  '/confirmacao-cadastro', '/confirmacao-nova-senha',
  '/espera-confirmacao-email', '/termo-e-condicoes-de-uso', '/politica-de-privacidade',
];

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly _valid = inject(SharedValidService);
  private readonly router = inject(Router);

  readonly isPublicPage = signal(true);

  constructor(private _loading: SharedLoadingService) {
    this._loading.changeEmitted$.subscribe();

    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const path = e.urlAfterRedirects.split('?')[0];
        this.isPublicPage.set(PUBLIC_ROUTES.some(r => path === r || path.startsWith(r + '/')));
      });
  }

  get activeValid(): Valid | null {
    const modules: Array<string> = [
      Modulo.Paciente, Modulo.Profissional, Modulo.Homecare,
      Modulo.PlanoSaude, Modulo.Root, 'valid',
    ];
    return modules.map(m => this._valid.getValid(m)).find(v => !!v) ?? null;
  }
}
