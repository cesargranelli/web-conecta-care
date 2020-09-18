import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomecaresComponent } from './homecares.component';
import { Routes, RouterModule } from '@angular/router';
import { InformacoesGeraisComponent } from './informacoes-gerais/informacoes-gerais.component';
import {NgxMaskModule} from 'ngx-mask';

const routes: Routes = [
  { path: 'homecares/:id', component: HomecaresComponent }
];

@NgModule({
  declarations: [HomecaresComponent, InformacoesGeraisComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxMaskModule
  ]
})
export class HomecaresModule { }
