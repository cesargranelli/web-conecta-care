import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
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
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormEnderecoComponent } from './shared/components/forms/endereco/form-endereco.component';
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
