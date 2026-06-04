import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegistrationCredentialsComponent } from './registration-credentials.component';

export const CADASTRO_ROUTES: Routes = [
  { path: '', component: RegisterComponent },
  { path: ':modulo/:id/register/login', component: RegistrationCredentialsComponent },
];
