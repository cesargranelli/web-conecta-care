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
import { CadastroHomeCareComponent } from './cadastro/homecare/cadastro-homecare.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { InformacoesContatoComponent } from './dados-homecares/contato/informacoes-contato.component';
import { DadosHomecaresComponent } from './dados-homecares/dados-homecares.component';
import { InformacoesEnderecoComponent } from './dados-homecares/endereco/informacoes-endereco.component';
import { InformacoesHomecareComponent } from './dados-homecares/homecare/informacoes-homecare.component';
import { InformacoesLoginComponent } from './dados-homecares/login/informacoes-login.component';
import { HomeCaresRoutingModule } from './homecares-routing.module';
import { HomeCaresComponent } from './homecares.component';
import { CardVerDadosComponent } from './shared/components/card-ver-dados/card-ver-dados.component';
import { FormContatoComponent } from './shared/components/forms/contato/form-contato.component';
import { FormHomeCareComponent } from './shared/components/forms/homecare/form-homecare.component';
import { SelectPickerComponent } from './shared/select-picker/select-picker.component';

@NgModule({
  declarations: [
    HomeCaresComponent,
    CadastroLoginComponent,
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
    FormContatoComponent,
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
