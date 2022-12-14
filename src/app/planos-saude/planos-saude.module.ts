import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { HeadersInterceptor } from 'src/app/services/interceptors/headers.interceptor';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { CadastroContatoComponent } from './cadastro/contato/cadastro-contato.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroPlanoSaudeComponent } from './cadastro/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './dados/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './dados/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeRoutingModule } from './planos-saude-routing.module';
import { PlanosSaudeComponent } from './planos-saude.component';
import { CardVerDadosComponent } from './shared/components/card-ver-dados/card-ver-dados.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/endereco/form-endereco.component';
import { FormPlanoSaudeComponent } from './shared/components/forms/plano-saude/form-plano-saude.component';
import { SelectPickerComponent } from './shared/select-picker/select-picker.component';

@NgModule({
  declarations: [
    PlanosSaudeComponent,
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
    FormEnderecoComponent,
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
