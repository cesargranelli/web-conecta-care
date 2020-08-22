import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  { path: 'admin/eventos', component: EventosComponent },
  { path: 'admin/eventos/cadastro', component: EventoComponent }
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
