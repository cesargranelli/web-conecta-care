import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoCadastroComponent } from './events/register/evento-cadastro.component';
import { EventoDetalheComponent } from './events/detail/evento-detalhe.component';
import { EventosComponent } from './events/eventos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'eventos', component: EventosComponent },
  { path: 'eventos/cadastro', component: EventoCadastroComponent },
  { path: 'eventos/:id', component: EventoDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
