import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveniosComponent } from './convenios.component';

const routes: Routes = [
  { path: 'convenios/:id', component: ConveniosComponent }
];

@NgModule({
  declarations: [ConveniosComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ConveniosModule { }
