import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomecaresComponent} from './homecares.component';
import {Routes, RouterModule} from '@angular/router';
import {InformacoesGeraisComponent} from './cadastro/informacoes-gerais/informacoes-gerais.component';
import {NgxMaskModule} from 'ngx-mask';
import {SelectPickerComponent} from './shared/select-picker/select-picker.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ContatoComponent } from './cadastro/contato/contato.component';

const routes: Routes = [
  {path: 'homecares/:id', component: HomecaresComponent}
];

@NgModule({
  declarations: [HomecaresComponent, InformacoesGeraisComponent, SelectPickerComponent, ContatoComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgxMaskModule,
    ReactiveFormsModule
  ]
})
export class HomecaresModule {
}
