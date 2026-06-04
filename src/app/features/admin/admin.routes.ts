import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'events',
    loadComponent: () => import('./events/eventos.component').then(m => m.EventosComponent),
  },
  {
    path: 'events/new',
    loadComponent: () => import('./events/register/evento-cadastro.component').then(m => m.EventoCadastroComponent),
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./events/detail/evento-detalhe.component').then(m => m.EventoDetalheComponent),
  },
];
