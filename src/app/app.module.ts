import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxLoadingModule} from 'ngx-loading';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';
import {GoogleMapsModule} from '@angular/google-maps';
import {AdminModule} from './admin/admin.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {tokenInterceptor} from './auth/interceptors/token.interceptor';
import {headersInterceptor} from './auth/interceptors/headers.interceptor';
import {sizeBodyInterceptor} from './auth/interceptors/size-body.interceptor';
import {CarreiraComponent} from './components/cadastro/profissional/carreira/carreira.component';
import {
  CadastroComplementoComponent
} from './components/cadastro/profissional/complemento/cadastro-complemento.component';
import {CadastroContaComponent} from './components/cadastro/profissional/conta/cadastro-conta.component';
import {ContatoComponent} from './components/cadastro/profissional/contato/contato.component';
import {EnderecoComponent} from './components/cadastro/profissional/endereco/endereco.component';
import {EscolaridadeComponent} from './components/cadastro/profissional/escolaridade/escolaridade.component';
import {ExperienciaComponent} from './components/cadastro/profissional/experiencia/experiencia.component';
import {
  CadastroInformacoesGeraisComponent
} from './components/cadastro/profissional/informacoes-gerais/cadastro-informacoes-gerais.component';
import {ConnectaComponent} from './components/connecta/connecta.component';
import {NavbarComponent} from './components/layout/navbar/navbar.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {HomeCaresModule} from './homecares/homecares.module';
import {PacientesModule} from './pacientes/pacientes.module';
import {ConfirmacaoCadastroComponent} from './pages/confirmacao-cadastro/confirmacao-cadastro.component';
import {ConfirmacaoNovaSenhaComponent} from './pages/confirmacao-nova-senha/confirmacao-nova-senha.component';
import {EsperaConfirmacaoEmailComponent} from './pages/espera-confirmacao-email/espera-confirmacao-email.component';
import {TermoPrivacidadeComponent} from './pages/termo-privacidade/termo-privacidade.component';
import {TermoUsoComponent} from './pages/termo-uso/termo-uso.component';
import {PlanosSaudeFilialModule} from './planos-saude-filial/planos-saude-filial.module';
import {PlanosSaudeModule} from './planos-saude/planos-saude.module';
import {ProfissionaisModule} from './profissionais/profissionais.module';
import {ValidadorCnpj} from './utils/validador-cnpj.utils';
import {ValidadorCpf} from './utils/validador-cpf.utils';

@NgModule({
  declarations: [
    AppComponent,
    ConnectaComponent,
    CadastroInformacoesGeraisComponent,
    EnderecoComponent,
    ContatoComponent,
    CarreiraComponent,
    ExperienciaComponent,
    EscolaridadeComponent,
    CadastroComplementoComponent,
    CadastroContaComponent,
    EsperaConfirmacaoEmailComponent,
    ConfirmacaoCadastroComponent,
    ConfirmacaoNovaSenhaComponent,
    TermoUsoComponent,
    TermoPrivacidadeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxLoadingModule.forRoot({ fullScreenBackdrop: true }),
    SweetAlert2Module.forRoot(),
    ProfissionaisModule,
    PacientesModule,
    HomeCaresModule,
    PlanosSaudeModule,
    PlanosSaudeFilialModule,
    AdminModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    // Design system layout components
    NavbarComponent,
    FooterComponent,
  ],
  providers: [
    provideHttpClient(
      withInterceptors([tokenInterceptor, headersInterceptor, sizeBodyInterceptor])
    ),
    provideNgxMask(),
    ValidadorCpf,
    ValidadorCnpj
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
