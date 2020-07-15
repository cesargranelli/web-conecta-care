import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { ProfissionaisComponent } from './profissionais.component';
import { DadosProfissionaisComponent } from './dados-profissionais/dados-profissionais.component';
import { ProfissionalComponent } from './dados-profissionais/profissional/profissional.component';
import { LoginComponent } from './dados-profissionais/profissional/login/login.component';

@NgModule({
  declarations: [ProfissionaisComponent, DadosProfissionaisComponent, ProfissionalComponent, LoginComponent],
  imports: [
    ProfissionaisRoutingModule,
    CommonModule
  ]
})
export class ProfissionaisModule { }
