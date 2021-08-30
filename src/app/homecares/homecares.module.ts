import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { HeadersInterceptor } from '../services/interceptors/headers.interceptor';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroHomeCareComponent } from './cadastro/homecare/cadastro-homecare.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosHomecaresComponent } from './dados/dados-homecares.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './dados/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { HomeCaresRoutingModule } from './homecares-routing.module';
import { HomeCaresComponent } from './homecares.component';
import { CardVerDadosComponent } from './shared/components/card-ver-dados/card-ver-dados.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/endereco/form-endereco.component';
import { FormHomeCareComponent } from './shared/components/forms/homecare/form-homecare.component';
import { ModalCriarTratamentoComponent } from './shared/components/modal/criar-tratamento/modal-criar-tratamento.component';
import { ModalDetalheAtendimentoComponent } from './shared/components/modal/detalhe-atendimento/modal-detalhe-atendimento.component';
import { ProntuarioComponent } from './shared/components/prontuario/prontuario.component';
import { SelectPickerComponent } from './shared/select-picker/select-picker.component';
import { AcompanhanteTratamentoComponent } from './tratamento/acompanhante/acompanhante-tratamento.component';
import { EnderecoTratamentoComponent } from './tratamento/endereco/endereco-tratamento.component';
import { PacienteTratamentoComponent } from './tratamento/paciente/paciente-tratamento.component';
import { ProfissionalTratamentoComponent } from './tratamento/profissional/profissional-tratamento.component';
import { SolicitacaoTratamentoComponent } from './tratamento/solicitacao/solicitacao-tratamento.component';
import { TratamentoComponent } from './tratamento/tratamento.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    HomeCaresComponent,
    CadastroHomeCareComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    SelectPickerComponent,
    CardVerDadosComponent,
    DadosHomecaresComponent,
    InformacoesLoginComponent,
    InformacoesContatoComponent,
    InformacoesEnderecoComponent,
    InformacoesHomecareComponent,
    FormHomeCareComponent,
    FormEnderecoComponent,
    FormContatoComponent,
    ModalDetalheAtendimentoComponent,
    ModalCriarTratamentoComponent,
    ProntuarioComponent,
    TratamentoComponent,
    SolicitacaoTratamentoComponent,
    PacienteTratamentoComponent,
    EnderecoTratamentoComponent,
    AcompanhanteTratamentoComponent,
    ProfissionalTratamentoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeCaresRoutingModule,
    NgxMaskModule,
    SharedComponentModule,
    FullCalendarModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    }
  ]
})
export class HomeCaresModule {
}
