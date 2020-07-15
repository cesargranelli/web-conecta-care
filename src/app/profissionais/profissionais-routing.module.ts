import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfissionaisComponent } from './profissionais.component';

const routes: Routes = [
  { path: 'profissionais/:id', component: ProfissionaisComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfissionaisRoutingModule { }
