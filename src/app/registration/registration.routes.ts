import { Routes } from '@angular/router';
import { RegistrationTypeComponent } from './registration-type.component';
import { RegistrationCredentialsComponent } from './registration-credentials.component';

export const CADASTRO_ROUTES: Routes = [
  { path: '', component: RegistrationTypeComponent },
  { path: ':modulo/:id/cadastro/login', component: RegistrationCredentialsComponent }
];
