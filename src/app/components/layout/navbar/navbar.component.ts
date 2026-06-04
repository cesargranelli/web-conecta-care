import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Role } from 'src/app/enums/role.enum';
import { Valid } from 'src/app/services/feat/Valid';

export interface NavLink {
  label: string;
  icon: string;
  route: string;
  external?: boolean;
}

function navLinksFor(valid: Valid | null): NavLink[] {
  if (!valid) return [];
  const id = valid.id;

  switch (valid.role) {
    case Role.Paciente:
      return [
        { label: 'Atendimentos', icon: 'room_service', route: `pacientes/${id}` },
        { label: 'Dados Pessoais', icon: 'engineering', route: `pacientes/${id}/dados` },
      ];
    case Role.Profissional:
      return [
        { label: 'Dados Profissionais', icon: 'engineering', route: `profissionais/${id}/dados-profissionais` },
        { label: 'Eventos', icon: 'insert_invitation', route: `profissionais/${id}/eventos` },
      ];
    case Role.Homecare:
      return [
        { label: 'Histórico', icon: 'visibility', route: `homecares/${id}/tratamento/preview` },
        { label: 'Tratamentos', icon: 'pending_actions', route: `homecares/${id}/tratamento/em-andamento` },
        { label: 'Atendimentos', icon: 'support_agent', route: `homecares/${id}` },
        { label: 'Dados Homecare', icon: 'engineering', route: `homecares/${id}/dados` },
        { label: 'Paciente', icon: 'person', route: `homecares/${id}/paciente` },
        { label: 'Profissional', icon: 'medication', route: `homecares/${id}/profissional` },
      ];
    case Role.PlanoSaude:
      return [
        { label: 'Dados', icon: 'engineering', route: `planos-saude/${id}/dados` },
        { label: 'Financeiro', icon: 'insert_invitation', route: `planos-saude/${id}/eventos` },
        { label: 'Cadastrar Filial', icon: 'save', route: `planos-saude/${id}/cadastro/filial` },
      ];
    case Role.PlanoSaudeFilial:
      return [
        { label: 'Dados', icon: 'engineering', route: `planos-saude-filial/${id}/dados` },
        { label: 'Financeiro', icon: 'insert_invitation', route: `planos-saude-filial/${id}/eventos` },
      ];
    case Role.Root:
      return [
        { label: 'Eventos', icon: 'pending_actions', route: 'admin/eventos' },
        { label: 'Cadastrar Evento', icon: 'mail', route: 'admin/eventos/cadastro' },
      ];
    default:
      return [];
  }
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }

  logout(): void {
    this.authService.removeTokens();
    this.mobileOpen.set(false);
    this.router.navigateByUrl('/login');
  }
}
