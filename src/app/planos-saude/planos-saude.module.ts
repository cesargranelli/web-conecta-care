import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { HeadersInterceptor } from '../services/interceptors/headers.interceptor';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { CadastroPlanoSaudeComponent } from './cadastro/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './dados-planos-saude/contato/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './dados-planos-saude/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './dados-planos-saude/endereco/informacoes-endereco.component';
import { InformacoesLoginComponent } from './dados-planos-saude/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './dados-planos-saude/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeRoutingModule } from './planos-saude-routing.module';
import { PlanosSaudeComponent } from './planos-saude.component';
import { CardVerDadosComponent } from './shared/components/card-ver-dados/card-ver-dados.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormPlanoSaudeComponent } from './shared/components/forms/plano-saude/form-plano-saude.component';
import { SelectPickerComponent } from './shared/select-picker/select-picker.component';

@NgModule({
  declarations: [
    PlanosSaudeComponent,
    CadastroLoginComponent,
    CadastroPlanoSaudeComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    SelectPickerComponent,
    CardVerDadosComponent,
    DadosPlanosSaudeComponent,
    InformacoesLoginComponent,
    InformacoesContatoComponent,
    InformacoesEnderecoComponent,
    InformacoesPlanoSaudeComponent,
    FormPlanoSaudeComponent,
    FormContatoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlanosSaudeRoutingModule,
    NgxMaskModule,
    SharedComponentModule
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
export class PlanosSaudeModule {
}
