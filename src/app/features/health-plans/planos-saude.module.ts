import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { CadastroContatoComponent } from './register/contact/cadastro-contato.component';
import { CadastroEnderecoComponent } from './register/address/cadastro-endereco.component';
import { CadastroPlanoSaudeComponent } from './register/plano-saude/cadastro-plano-saude.component';
import { InformacoesContatoComponent } from './details/contact/informacoes-contato.component';
import { DadosPlanosSaudeComponent } from './details/dados-planos-saude.component';
import { InformacoesEnderecoComponent } from './details/address/informacoes-endereco.component';
import { InformacoesLoginComponent } from './details/login/informacoes-login.component';
import { InformacoesPlanoSaudeComponent } from './details/plano-saude/informacoes-plano-saude.component';
import { PlanosSaudeRoutingModule } from './planos-saude-routing.module';
import { PlanosSaudeComponent } from './planos-saude.component';
import { FormContatoComponent } from './shared/components/forms/contact/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/address/form-endereco.component';
import { FormPlanoSaudeComponent } from './shared/components/forms/plano-saude/form-plano-saude.component';

@NgModule({
  declarations: [
    PlanosSaudeComponent,
    CadastroPlanoSaudeComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
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
    NgxMaskDirective,
    NgxMaskPipe,
    SharedComponentModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlanosSaudeModule {
}
