import { Routes } from '@angular/router';
import { authGuard } from './features/auth/guards/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth — lazy
  {
    path: 'login',
    loadComponent: () => import('./features/auth/containers/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'login/manutencao-senha',
    loadComponent: () => import('./features/auth/containers/login/manutencao-senha/manutencao-senha.component').then(m => m.ManutencaoSenhaComponent),
  },
  {
    path: 'login/esqueci-minha-senha',
    loadComponent: () => import('./features/auth/containers/login/esqueci-minha-senha/esqueci-minha-senha.component').then(m => m.EsqueciMinhaSenhaComponent),
  },
  {
    path: 'login/nova-senha/:id',
    loadComponent: () => import('./features/auth/containers/login/nova-senha/nova-senha.component').then(m => m.NovaSenhaComponent),
  },
  {
    path: 'admin/login',
    loadComponent: () => import('./features/auth/containers/login-admin/login-admin.component').then(m => m.LoginAdminComponent),
  },

  // Registration — lazy
  {
    path: 'register',
    loadComponent: () => import('./features/registration/register/register.component').then(m => m.RegisterComponent),
  },
  // Legacy path redirect
  { path: 'cadastro', redirectTo: 'register', pathMatch: 'full' },
  {
    path: 'register/professionals/:id',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/registration/professional/cadastro-profissional.routes')
        .then(m => m.CADASTRO_PROFISSIONAL_ROUTES),
  },
  // Legacy path redirect
  { path: 'cadastro/profissionais/:id', redirectTo: 'register/professionals/:id' },

  // Pages — lazy
  {
    path: 'confirm-registration/:token',
    loadComponent: () =>
      import('./pages/confirm-registration/confirmacao-cadastro.component')
        .then(m => m.ConfirmacaoCadastroComponent),
  },
  {
    path: 'confirm-password/:token',
    loadComponent: () =>
      import('./pages/confirm-password/confirmacao-nova-senha.component')
        .then(m => m.ConfirmacaoNovaSenhaComponent),
  },
  {
    path: 'waiting-email-confirmation',
    loadComponent: () =>
      import('./pages/waiting-email/espera-confirmacao-email.component')
        .then(m => m.EsperaConfirmacaoEmailComponent),
  },
  {
    path: 'terms-of-use',
    loadComponent: () =>
      import('./pages/terms/termo-uso.component').then(m => m.TermoUsoComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy/termo-privacidade.component')
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
    loadChildren: () => import('./features/patients/patients.routes').then(m => m.PATIENTS_ROUTES),
  },
  {
    path: 'professionals',
    canActivate: [authGuard],
    loadChildren: () => import('./features/professionals/professionals.routes').then(m => m.PROFESSIONALS_ROUTES),
  },
  {
    path: 'homecares',
    canActivate: [authGuard],
    loadChildren: () => import('./features/homecares/homecares.routes').then(m => m.HOMECARES_ROUTES),
  },
  {
    path: 'health-plans',
    canActivate: [authGuard],
    loadChildren: () => import('./features/health-plans/health-plans.routes').then(m => m.HEALTH_PLANS_ROUTES),
  },
  {
    path: 'health-plan-branches',
    canActivate: [authGuard],
    loadChildren: () => import('./features/health-plan-branches/health-plan-branches.routes').then(m => m.HEALTH_PLAN_BRANCHES_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },

  // Legacy feature path redirects
  { path: 'pacientes',          redirectTo: 'patients' },
  { path: 'profissionais',      redirectTo: 'professionals' },
  { path: 'planos-saude',       redirectTo: 'health-plans' },
  { path: 'planos-saude-filial', redirectTo: 'health-plan-branches' },

  { path: '**', redirectTo: 'login' },
];
