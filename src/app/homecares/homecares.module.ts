import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomecaresComponent } from './homecares.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'homecares/:id', component: HomecaresComponent }
];

@NgModule({
  declarations: [HomecaresComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class HomecaresModule { }
