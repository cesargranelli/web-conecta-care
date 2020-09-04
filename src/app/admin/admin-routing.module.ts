import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './auth/guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { EventoCadastroComponent } from './eventos/cadastro/evento-cadastro.component';
import { EventoDetalheComponent } from './eventos/detalhe/evento-detalhe.component';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  { path: 'admin', pathMatch: 'full', redirectTo: 'admin/login' },
  { path: 'admin/login', component: LoginComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/eventos', component: EventosComponent },
  { path: 'admin/eventos/cadastro', component: EventoCadastroComponent },
  { path: 'admin/eventos/:id', component: EventoDetalheComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
