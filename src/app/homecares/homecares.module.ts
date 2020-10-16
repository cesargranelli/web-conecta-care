import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskModule} from 'ngx-mask';
import {TokenInterceptor} from 'src/app/auth/token.interceptor';
import {SharedComponentModule} from 'src/app/shared/components/shared-component.module';
import {CadastroContatoComponent} from './cadastro/contato/cadastro-contato.component';
import {CadastroEnderecoComponent} from './cadastro/endereco/cadastro-endereco.component';
import {CadastroHomeCareComponent} from './cadastro/homecare/cadastro-homecare.component';
import {CadastroLoginComponent} from './cadastro/login/cadastro-login.component';
import {DadosHomecaresComponent} from './dados/dados-homecares/dados-homecares.component';
import {InformacoesLoginComponent} from './dados/informacoes-login/informacoes-login.component';
import {HomeCaresRoutingModule} from './homecares-routing.module';
import {HomeCaresComponent} from './homecares.component';
import {CardVerDadosComponent} from './shared/card-ver-dados/card-ver-dados.component';
import {FormContatoComponent} from './shared/components/forms/contato/form-contato.component';
import {FormHomeCareComponent} from './shared/components/forms/homecare/form-homecare.component';
import {SelectPickerComponent} from './shared/select-picker/select-picker.component';
import {InformacoesContatoComponent} from './dados/informacoes-contato/informacoes-contato.component';
import {InformacoesEnderecoComponent} from './dados/informacoes-endereco/informacoes-endereco.component';
import {InformacoesHomecareComponent} from './dados/informacoes-homecare/informacoes-homecare.component';

@NgModule({
  declarations: [
    HomeCaresComponent,
    CadastroLoginComponent,
    CadastroHomeCareComponent,
    CadastroEnderecoComponent,
    CadastroContatoComponent,
    InformacoesLoginComponent,
    SelectPickerComponent,
    CardVerDadosComponent,
    DadosHomecaresComponent,
    FormHomeCareComponent,
    InformacoesContatoComponent,
    InformacoesEnderecoComponent,
    InformacoesHomecareComponent,
    FormContatoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeCaresRoutingModule,
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
    }
  ]
})
export class HomeCaresModule {
}
