import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectaComponent } from './views/connecta/connecta.component';
import { SigninComponent } from './views/signin/signin.component';

const routes: Routes = [
  { path: '', component: ConnectaComponent },
  { path: 'cadastro', component: SigninComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
