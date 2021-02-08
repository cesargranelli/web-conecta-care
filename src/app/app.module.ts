import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxMaskModule } from 'ngx-mask';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { TokenInterceptor } from './auth/token.interceptor';
import { CadastroModule } from './cadastro/cadastro.module';
import { CarreiraComponent } from './components/cadastro/profissional/carreira/carreira.component';
import { ComplementoComponent } from './components/cadastro/profissional/complemento/complemento.component';
import { ContaComponent } from './components/cadastro/profissional/conta/conta.component';
import { ContatoComponent } from './components/cadastro/profissional/contato/contato.component';
import { EnderecoComponent } from './components/cadastro/profissional/endereco/endereco.component';
import { EscolaridadeComponent } from './components/cadastro/profissional/escolaridade/escolaridade.component';
import { ExperienciaComponent } from './components/cadastro/profissional/experiencia/experiencia.component';
import { InformacoesGeraisComponent } from './components/cadastro/profissional/informacoes-gerais/informacoes-gerais.component';
import { ConnectaComponent } from './components/connecta/connecta.component';
import { MenuAdminComponent } from './components/menu/menu-admin/menu-admin.component';
import { MenuHomecaresComponent } from './components/menu/menu-homecares/menu-homecares.component';
import { MenuLogadoComponent } from './components/menu/menu-logado/menu-logado.component';
import { MenuPacientesComponent } from './components/menu/menu-pacientes/menu-pacientes.component';
import { MenuPlanosSaudeFilialComponent } from './components/menu/menu-planos-saude-filial/menu-planos-saude-filial.component';
import { MenuPlanosSaudeComponent } from './components/menu/menu-planos-saude/menu-planos-saude.component';
import { MenuProfissionaisComponent } from './components/menu/menu-profissionais/menu-profissionais.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeCaresModule } from './homecares/homecares.module';
import { PacientesModule } from './pacientes/pacientes.module';
import { ConfirmacaoCadastroComponent } from './pages/confirmacao-cadastro/confirmacao-cadastro.component';
import { ConfirmacaoNovaSenhaComponent } from './pages/confirmacao-nova-senha/confirmacao-nova-senha.component';
import { EsperaConfirmacaoEmailComponent } from './pages/espera-confirmacao-email/espera-confirmacao-email.component';
import { PlanosSaudeFilialModule } from './planos-saude-filial/planos-saude-filial.module';
import { PlanosSaudeModule } from './planos-saude/planos-saude.module';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { HeadersInterceptor } from './services/interceptors/headers.interceptor';
import { ValidadorCnpj } from './utils/validador-cnpj.utils';
import { ValidadorCpf } from './utils/validador-cpf.utils';
import { AgmCoreModule } from "@agm/core";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuLogadoComponent,
    MenuProfissionaisComponent,
    MenuPacientesComponent,
    MenuHomecaresComponent,
    MenuPlanosSaudeComponent,
    MenuPlanosSaudeFilialComponent,
    MenuAdminComponent,
    ConnectaComponent,
    InformacoesGeraisComponent,
    EnderecoComponent,
    ContatoComponent,
    CarreiraComponent,
    ExperienciaComponent,
    EscolaridadeComponent,
    ComplementoComponent,
    ContaComponent,
    EsperaConfirmacaoEmailComponent,
    ConfirmacaoCadastroComponent,
    ConfirmacaoNovaSenhaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    SweetAlert2Module.forRoot(),
    ProfissionaisModule,
    PacientesModule,
    HomeCaresModule,
    PlanosSaudeModule,
    PlanosSaudeFilialModule,
    AuthModule,
    AdminModule,
    CadastroModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC1TvkS6hk3zAObpWx0KOcZjdJDr5c6J9U'
    })
  ],
  providers: [
    ValidadorCpf,
    ValidadorCnpj,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
