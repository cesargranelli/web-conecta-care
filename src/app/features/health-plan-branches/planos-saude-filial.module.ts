import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroLoginComponent } from './register/login/cadastro-login.component';
import { CadastroPlanoSaudeFilialComponent } from './register/plano-saude-filial/cadastro-plano-saude-filial.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosPlanosSaudeFilialComponent } from './details/dados-planos-saude-filial.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { InformacoesPlanoSaudeFilialComponent } from './details/plano-saude-filial/informacoes-plano-saude-filial.component';
import { PlanosSaudeFilialRoutingModule } from './planos-saude-filial-routing.module';
import { PlanosSaudeFilialComponent } from './planos-saude-filial.component';
import { FormContatoComponent } from './shared/components/forms/contact/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/address/form-endereco.component';
import { FormLoginComponent } from './shared/components/forms/login/form-login.component';
import { FormPlanoSaudeFilialComponent } from './shared/components/forms/plano-saude-filial/form-plano-saude-filial.component';

@NgModule({
  declarations: [
    PlanosSaudeFilialComponent,
    CadastroLoginComponent,
    CadastroPlanoSaudeFilialComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
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
    NgxMaskDirective,
    NgxMaskPipe,
    SharedComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlanosSaudeFilialModule {
}
