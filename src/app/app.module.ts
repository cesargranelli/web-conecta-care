import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuComponent } from './views/menu/menu.component';
import { ConnectaComponent } from './views/connecta/connecta.component';
import { SigninComponent } from './views/signin/signin.component';
import { ValidadorCpf } from './utils/validador-cpf.utils';
import { ValidadorCnpj } from './utils/validador-cnpj.utils';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ConnectaComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    ValidadorCpf,
    ValidadorCnpj
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
