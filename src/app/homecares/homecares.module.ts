import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { TokenInterceptor } from 'src/app/auth/token.interceptor';
import { SharedComponentModule } from 'src/app/shared/components/shared-component.module';
import { ContatoComponent } from '../components/cadastro/profissional/contato/contato.component';
import { InformacoesGeraisComponent } from '../components/cadastro/profissional/informacoes-gerais/informacoes-gerais.component';
import { CadastroEnderecoComponent } from './cadastro/endereco/cadastro-endereco.component';
import { CadastroLoginComponent } from './cadastro/login/cadastro-login.component';
import { HomecaresRoutingModule } from './homecares-routing.module';
import { HomecaresComponent } from './homecares.component';
import { SelectPickerComponent } from './shared/select-picker/select-picker.component';

@NgModule({
  declarations: [
    HomecaresComponent,
    CadastroLoginComponent,
    CadastroEnderecoComponent,
    InformacoesGeraisComponent,
    SelectPickerComponent,
    ContatoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomecaresRoutingModule,
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
export class HomecaresModule {
}
