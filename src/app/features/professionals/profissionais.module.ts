import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from '../shared/components/shared-component.module';
import { CarreiraComponent } from './profile/career/carreira.component';
import { DadosComplementoComponent } from './profile/supplemental/dados-complemento.component';
import { DadosContaComponent } from './profile/bank-account/dados-conta.component';
import { ContatoComponent } from './profile/contact/contato.component';
import { DadosProfissionaisComponent } from './profile/profile.component';
import { EnderecoComponent } from './profile/address/endereco.component';
import { EscolaridadeComponent } from './profile/education/escolaridade.component';
import { ExperienciaComponent } from './profile/experience/experiencia.component';
import { DadosInformacoesGeraisComponent } from './profile/general-info/dados-informacoes-gerais.component';
import { LoginComponent } from './profile/login/login.component';
import { EventoDetalheComponent } from './events/detail/evento-detalhe.component';
import { EventosComponent } from './events/eventos.component';
import { ProfissionaisRoutingModule } from './profissionais-routing.module';
import { ProfissionaisComponent } from './profissionais.component';

@NgModule({
    declarations: [
        ProfissionaisComponent,
        DadosProfissionaisComponent,
        DadosInformacoesGeraisComponent,
        LoginComponent,
        EnderecoComponent,
        ContatoComponent,
        CarreiraComponent,
        ExperienciaComponent,
        EscolaridadeComponent,
        DadosComplementoComponent,
        DadosContaComponent,
        EventosComponent,
        EventoDetalheComponent,
    ],
    imports: [CommonModule, ReactiveFormsModule, ProfissionaisRoutingModule, NgxMaskDirective, NgxMaskPipe, SharedComponentModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfissionaisModule {
}
