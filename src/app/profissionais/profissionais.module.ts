import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfissionaisComponent } from './profissionais.component';

const routes: Routes = [
  { path: 'profissionais/:id', component: ProfissionaisComponent }
];

@NgModule({
  declarations: [ProfissionaisComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProfissionaisModule { }
