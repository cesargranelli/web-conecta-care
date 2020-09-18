import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacoesLoginComponent } from './dados/informacoes-login/informacoes-login.component';
import { HomecaresComponent } from './homecares.component';

const routes: Routes = [
  { path: 'homecares/:id', component: HomecaresComponent },
  { path: 'homecares/:id/informacoes-login', component: InformacoesLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomecaresRoutingModule {
}
