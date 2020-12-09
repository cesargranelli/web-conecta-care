import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';

const routes: Routes = [
  {path: 'pacientes/:id', component: PacientesComponent},
  {path: 'pacientes/:id/cadastro/login', component: CadastroLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PacientesRoutingModule {
}
