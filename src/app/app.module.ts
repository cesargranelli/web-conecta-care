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
import { CadastroLoginComponent } from './components/forms/cadastro-login/cadastro-login.component';
import { BasicRecaptchaComponent } from './components/recaptcha/basic-recaptcha.component';
import { ValidadorCnpj } from './utils/validador-cnpj.utils';
import { ValidadorCpf } from './utils/validador-cpf.utils';
import { CadastroProfissionalComponent } from './views/cadastro/profissional/cadastro-profissional.component';
import { ConnectaComponent } from './views/connecta/connecta.component';
import { MenuComponent } from './views/menu/menu.component';
import { SigninComponent } from './views/signin/signin.component';
import { InformacoesGeraisComponent } from './components/forms/profissional/informacoes-gerais/informacoes-gerais.component';
import { EnderecoComponent } from './components/forms/endereco/endereco.component';
import { ContatoComponent } from './components/forms/contato/contato.component';
import { CarreiraComponent } from './components/forms/profissional/carreira/carreira.component';
import { ExperienciaComponent } from './components/forms/profissional/experiencia/experiencia.component';
import { EscolaridadeComponent } from './components/forms/profissional/escolaridade/escolaridade.component';
import { ComplementoComponent } from './components/forms/profissional/complemento/complemento.component';
import { ContaComponent } from './components/forms/conta/conta.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConnectaComponent,
    SigninComponent,
    CadastroProfissionalComponent,
    CadastroLoginComponent,
    BasicRecaptchaComponent,
    InformacoesGeraisComponent,
    EnderecoComponent,
    ContatoComponent,
    CarreiraComponent,
    ExperienciaComponent,
    EscolaridadeComponent,
    ComplementoComponent,
    ContaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    RecaptchaModule,
    NgxLoadingModule.forRoot({}),
    SweetAlert2Module.forRoot()
  ],
  providers: [
    ValidadorCpf,
    ValidadorCnpj
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
