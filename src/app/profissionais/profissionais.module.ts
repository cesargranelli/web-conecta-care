import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from '../auth/token.interceptor';
import { CardVerDadosComponent } from './components/card/card-ver-dados/card-ver-dados.component';
import { CarreiraComponent } from './dados-profissionais/carreira/carreira.component';
import { DadosComplementoComponent } from './dados-profissionais/complemento/dados-complemento.component';
import { DadosContaComponent } from './dados-profissionais/conta/dados-conta.component';
import { ContatoComponent } from './dados-profissionais/contato/contato.component';
import { DadosProfissionaisComponent } from './dados-profissionais/dados-profissionais.component';
import { EnderecoComponent } from './dados-profissionais/endereco/endereco.component';
import { EscolaridadeComponent } from './dados-profissionais/escolaridade/escolaridade.component';
import { ExperienciaComponent } from './dados-profissionais/experiencia/experiencia.component';
import { DadosInformacoesGeraisComponent } from './dados-profissionais/informacoes-gerais/dados-informacoes-gerais.component';
import { LoginComponent } from './dados-profissionais/login/login.component';
import { EventoDetalheComponent } from './eventos/detalhe/evento-detalhe.component';
import { EventosComponent } from './eventos/eventos.component';
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
    CardVerDadosComponent,
    EventosComponent,
    EventoDetalheComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ProfissionaisRoutingModule, NgxMaskModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class ProfissionaisModule {
}
