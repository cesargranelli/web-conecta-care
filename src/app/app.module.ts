import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxMaskModule } from 'ngx-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { BasicRecaptchaComponent } from './components/recaptcha/basic-recaptcha.component';
import { ValidadorCnpj } from './utils/validador-cnpj.utils';
import { ValidadorCpf } from './utils/validador-cpf.utils';
import { CadastroProfissionalComponent } from './views/cadastro/profissional/cadastro-profissional.component';
import { ConnectaComponent } from './views/connecta/connecta.component';
import { MenuComponent } from './views/menu/menu.component';
import { SigninComponent } from './views/signin/signin.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConnectaComponent,
    SigninComponent,
    CadastroProfissionalComponent,
    LoginFormComponent,
    BasicRecaptchaComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
    RecaptchaModule
  ],
  providers: [
    ValidadorCpf,
    ValidadorCnpj
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
