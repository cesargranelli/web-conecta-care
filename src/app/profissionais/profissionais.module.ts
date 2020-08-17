import {CommonModule} from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CardVerDadosComponent} from './components/card/card-ver-dados/card-ver-dados.component';
import {CarreiraComponent} from './dados-profissionais/carreira/carreira.component';
import {ComplementoComponent} from './dados-profissionais/complemento/complemento.component';
import {ContaComponent} from './dados-profissionais/conta/conta.component';
import {ContatoComponent} from './dados-profissionais/contato/contato.component';
import {DadosProfissionaisComponent} from './dados-profissionais/dados-profissionais.component';
import {EnderecoComponent} from './dados-profissionais/endereco/endereco.component';
import {EscolaridadeComponent} from './dados-profissionais/escolaridade/escolaridade.component';
import {ExperienciaComponent} from './dados-profissionais/experiencia/experiencia.component';
import {LoginComponent} from './dados-profissionais/login/login.component';
import {EventosComponent} from './eventos/eventos.component';
import {ProfissionaisRoutingModule} from './profissionais-routing.module';
import {ProfissionaisComponent} from './profissionais.component';
import {NgxMaskModule} from 'ngx-mask';
import {InformacoesGeraisComponent} from './dados-profissionais/informacoes-gerais/informacoes-gerais.component';

@NgModule({
  declarations: [
    ProfissionaisComponent,
    DadosProfissionaisComponent,
    LoginComponent,
    EnderecoComponent,
    ContatoComponent,
    CarreiraComponent,
    ExperienciaComponent,
    EscolaridadeComponent,
    ComplementoComponent,
    ContaComponent,
    CardVerDadosComponent,
    EventosComponent,
    InformacoesGeraisComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, ProfissionaisRoutingModule, NgxMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfissionaisModule {
}
