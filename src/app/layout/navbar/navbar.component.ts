import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Role } from 'src/app/core/enums/role.enum';
import { Valid } from 'src/app/core/models/Valid';

export interface NavLink {
  label: string;
  icon: string;
  route: string;
}

function navLinksFor(valid: Valid | null): NavLink[] {
  if (!valid) return [];
  const id = valid.id;
  switch (valid.role) {
    case Role.Paciente:      return [
      { label: 'Atendimentos',       icon: 'pi pi-calendar',      route: `pacientes/${id}` },
      { label: 'Dados Pessoais',     icon: 'pi pi-user',          route: `pacientes/${id}/dados` },
    ];
    case Role.Profissional:  return [
      { label: 'Dados Profissionais',icon: 'pi pi-briefcase',     route: `profissionais/${id}/profile` },
      { label: 'Eventos',            icon: 'pi pi-calendar-plus', route: `profissionais/${id}/eventos` },
    ];
    case Role.Homecare:      return [
      { label: 'Histórico',          icon: 'pi pi-history',       route: `homecares/${id}/treatment/preview` },
      { label: 'Tratamentos',        icon: 'pi pi-heart',         route: `homecares/${id}/treatment/em-andamento` },
      { label: 'Atendimentos',       icon: 'pi pi-users',         route: `homecares/${id}` },
      { label: 'Dados Homecare',     icon: 'pi pi-building',      route: `homecares/${id}/dados` },
      { label: 'Paciente',           icon: 'pi pi-user',          route: `homecares/${id}/paciente` },
      { label: 'Profissional',       icon: 'pi pi-id-card',       route: `homecares/${id}/profissional` },
    ];
    case Role.PlanoSaude:    return [
      { label: 'Dados',              icon: 'pi pi-building',      route: `planos-saude/${id}/dados` },
      { label: 'Financeiro',         icon: 'pi pi-wallet',        route: `planos-saude/${id}/eventos` },
      { label: 'Cadastrar Filial',   icon: 'pi pi-plus-circle',   route: `planos-saude/${id}/register/filial` },
    ];
    case Role.PlanoSaudeFilial: return [
      { label: 'Dados',              icon: 'pi pi-building',      route: `planos-saude-filial/${id}/dados` },
      { label: 'Financeiro',         icon: 'pi pi-wallet',        route: `planos-saude-filial/${id}/eventos` },
    ];
    case Role.Root:          return [
      { label: 'Eventos',            icon: 'pi pi-list',          route: 'admin/eventos' },
      { label: 'Cadastrar Evento',   icon: 'pi pi-envelope',      route: 'admin/events/cadastro' },
    ];
    default: return [];
  }
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly valid = input<Valid | null>(null);
  readonly mobileOpen = signal(false);

  links: NavLink[] = [];

  ngOnInit(): void {
    this.links = navLinksFor(this.valid());
  }

  toggleMobile(): void { this.mobileOpen.update(v => !v); }

  logout(): void {
    this.authService.removeTokens();
    this.mobileOpen.set(false);
    this.router.navigateByUrl('/login');
  }
}
