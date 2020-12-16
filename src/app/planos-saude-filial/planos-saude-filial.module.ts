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
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { CadastroPlanoSaudeFilialComponent } from './cadastro/plano-saude-filial/cadastro-plano-saude-filial.component';
import { InformacoesContatoComponent } from './dados/contato/informacoes-contato.component';
import { DadosPlanosSaudeFilialComponent } from './dados/dados-planos-saude-filial.component';
import { InformacoesEnderecoComponent } from './dados/endereco/informacoes-endereco.component';
import { InformacoesLoginComponent } from './dados/login/informacoes-login.component';
import { InformacoesPlanoSaudeFilialComponent } from './dados/plano-saude-filial/informacoes-plano-saude-filial.component';
import { PlanosSaudeFilialRoutingModule } from './planos-saude-filial-routing.module';
import { PlanosSaudeFilialComponent } from './planos-saude-filial.component';
import { CardVerDadosComponent } from './shared/components/card-ver-dados/card-ver-dados.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/endereco/form-endereco.component';
import { FormLoginComponent } from './shared/components/forms/login/form-login.component';
import { FormPlanoSaudeFilialComponent } from './shared/components/forms/plano-saude-filial/form-plano-saude-filial.component';
import { SelectPickerComponent } from './shared/select-picker/select-picker.component';

@NgModule({
  declarations: [
    PlanosSaudeFilialComponent,
    CadastroLoginComponent,
    CadastroPlanoSaudeFilialComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    SelectPickerComponent,
    CardVerDadosComponent,
    DadosPlanosSaudeFilialComponent,
    InformacoesLoginComponent,
    InformacoesContatoComponent,
    InformacoesEnderecoComponent,
    InformacoesPlanoSaudeFilialComponent,
    FormLoginComponent,
    FormPlanoSaudeFilialComponent,
    FormEnderecoComponent,
    FormContatoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PlanosSaudeFilialRoutingModule,
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
export class PlanosSaudeFilialModule {
}
