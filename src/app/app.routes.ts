import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth — lazy
  {
    path: 'login',
    loadComponent: () => import('./auth/containers/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'login/manutencao-senha',
    loadComponent: () => import('./auth/containers/login/manutencao-senha/manutencao-senha.component').then(m => m.ManutencaoSenhaComponent),
  },
  {
    path: 'login/esqueci-minha-senha',
    loadComponent: () => import('./auth/containers/login/esqueci-minha-senha/esqueci-minha-senha.component').then(m => m.EsqueciMinhaSenhaComponent),
  },
  {
    path: 'login/nova-senha/:id',
    loadComponent: () => import('./auth/containers/login/nova-senha/nova-senha.component').then(m => m.NovaSenhaComponent),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./auth/containers/login-admin/login-admin.component').then(m => m.LoginAdminComponent),
  },

  // Registration — lazy
  {
    path: 'register',
    loadComponent: () => import('./registration/register/register.component').then(m => m.RegisterComponent),
  },
  // Legacy path redirect
  { path: 'cadastro', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register/professionals/:id',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./components/cadastro/profissional/cadastro-profissional.routes')
        .then(m => m.CADASTRO_PROFISSIONAL_ROUTES),
  },
  // Legacy path redirect
  { path: 'cadastro/profissionais/:id', redirectTo: 'register/professionals/:id' },

  // Pages — lazy
  {
    path: 'confirm-registration/:token',
    loadComponent: () =>
      import('./pages/confirmacao-cadastro/confirmacao-cadastro.component')
        .then(m => m.ConfirmacaoCadastroComponent),
  },
  {
    path: 'confirm-password/:token',
    loadComponent: () =>
      import('./pages/confirmacao-nova-senha/confirmacao-nova-senha.component')
        .then(m => m.ConfirmacaoNovaSenhaComponent),
  },
  {
    path: 'waiting-email-confirmation',
    loadComponent: () =>
      import('./pages/espera-confirmacao-email/espera-confirmacao-email.component')
        .then(m => m.EsperaConfirmacaoEmailComponent),
  },
  {
    path: 'terms-of-use',
    loadComponent: () =>
      import('./pages/termo-uso/termo-uso.component').then(m => m.TermoUsoComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/termo-privacidade/termo-privacidade.component')
        .then(m => m.TermoPrivacidadeComponent),
  },
  // Legacy page path redirects
  { path: 'confirmacao-cadastro/:token',     redirectTo: 'confirm-registration/:token' },
  { path: 'confirmacao-nova-senha/:token',   redirectTo: 'confirm-password/:token' },
  { path: 'espera-confirmacao-email',        redirectTo: 'waiting-email-confirmation' },
  { path: 'termo-e-condicoes-de-uso',        redirectTo: 'terms-of-use' },
  { path: 'politica-de-privacidade',         redirectTo: 'privacy-policy' },

  // Feature modules — lazy + protected
  {
    path: 'patients',
    canActivate: [authGuard],
    loadChildren: () => import('./pacientes/pacientes.module').then(m => m.PacientesModule),
  },
  {
    path: 'professionals',
    canActivate: [authGuard],
    loadChildren: () => import('./profissionais/profissionais.module').then(m => m.ProfissionaisModule),
  },
  {
    path: 'homecares',
    canActivate: [authGuard],
    loadChildren: () => import('./homecares/homecares.module').then(m => m.HomeCaresModule),
  },
  {
    path: 'health-plans',
    canActivate: [authGuard],
    loadChildren: () => import('./planos-saude/planos-saude.module').then(m => m.PlanosSaudeModule),
  },
  {
    path: 'health-plan-branches',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./planos-saude-filial/planos-saude-filial.module').then(m => m.PlanosSaudeFilialModule),
  },
  {
    path: 'admin',
    canActivate: [authGuard],   // ← FIX: was missing
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },

  // Legacy feature path redirects
  { path: 'pacientes',          redirectTo: 'patients' },
  { path: 'profissionais',      redirectTo: 'professionals' },
  { path: 'planos-saude',       redirectTo: 'health-plans' },
  { path: 'planos-saude-filial', redirectTo: 'health-plan-branches' },

  { path: '**', redirectTo: 'login' },
];
