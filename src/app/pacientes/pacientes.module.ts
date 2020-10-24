import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PacientesComponent} from './pacientes.component';

const routes: Routes = [
  {path: 'pacientes/:id', component: PacientesComponent}
];

@NgModule({
  declarations: [PacientesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PacientesModule {
}
