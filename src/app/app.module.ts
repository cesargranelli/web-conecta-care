import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { CadastroLoginComponent } from './components/cadastro/login/cadastro-login.component';
import { CadastroProfissionalComponent } from './components/cadastro/profissional/cadastro-profissional.component';
import { CarreiraComponent } from './components/cadastro/profissional/carreira/carreira.component';
import { ComplementoComponent } from './components/cadastro/profissional/complemento/complemento.component';
import { EscolaridadeComponent } from './components/cadastro/profissional/escolaridade/escolaridade.component';
import { ExperienciaComponent } from './components/cadastro/profissional/experiencia/experiencia.component';
import { InformacoesGeraisComponent } from './components/cadastro/profissional/informacoes-gerais/informacoes-gerais.component';
import { ConnectaComponent } from './components/connecta/connecta.component';
import { ContaComponent } from './components/forms/conta/conta.component';
import { ContatoComponent } from './components/forms/contato/contato.component';
import { EnderecoComponent } from './components/forms/endereco/endereco.component';
import { MenuLogadoComponent } from './components/menu/menu-logado/menu-logado.component';
import { MenuComponent } from './components/menu/menu.component';
import { BasicRecaptchaComponent } from './components/recaptcha/basic-recaptcha.component';
import { ConveniosModule } from './convenios/convenios.module';
import { HomecaresModule } from './homecares/homecares.module';
import { EsqueciMinhaSenhaComponent } from './login/esqueci-minha-senha/esqueci-minha-senha.component';
import { LoginComponent } from './login/login.component';
import { NovaSenhaComponent } from './login/nova-senha/nova-senha.component';
import { PacientesModule } from './pacientes/pacientes.module';
import { ConfirmacaoCadastroComponent } from './pages/confirmacao-cadastro/confirmacao-cadastro.component';
import { ConfirmacaoNovaSenhaComponent } from './pages/confirmacao-nova-senha/confirmacao-nova-senha.component';
import { EsperaConfirmacaoEmailComponent } from './pages/espera-confirmacao-email/espera-confirmacao-email.component';
import { ProfissionaisModule } from './profissionais/profissionais.module';
import { ProfissionalService } from './services/profissional.service';
import { ValidadorCnpj } from './utils/validador-cnpj.utils';
import { ValidadorCpf } from './utils/validador-cpf.utils';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuLogadoComponent,
    ConnectaComponent,
    CadastroComponent,
    CadastroLoginComponent,
    CadastroProfissionalComponent,
    BasicRecaptchaComponent,
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
    ConfirmacaoNovaSenhaComponent,
    LoginComponent,
    EsqueciMinhaSenhaComponent,
    NovaSenhaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    RecaptchaModule,
    NgxLoadingModule.forRoot({}),
    SweetAlert2Module.forRoot(),
    ProfissionaisModule,
    PacientesModule,
    HomecaresModule,
    ConveniosModule
  ],
  providers: [
    ValidadorCpf,
    ValidadorCnpj,
    { provide: 'DoumentoService', useClass: ProfissionalService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
