import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { CardVerDadosComponent } from 'src/app/shared/components/cards/card-ver-dados/card-ver-dados.component';
import {Component, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, CardVerDadosComponent],
  selector: 'app-informacoes-homecares',
  templateUrl: './dados-homecares.component.html',
  styleUrls: ['./dados-homecares.component.css']
})
export class DadosHomecaresComponent implements OnInit {

  cards = [
    { icon: 'fingerprint', link: './login', value: 'Ver', stats: 'Informações de Login' },
    { icon: 'info', link: './homecare', value: 'Ver', stats: 'Informações Gerais' },
    { icon: 'house', link: './endereco', value: 'Ver', stats: 'Informações de Endereço' },
    { icon: 'contact_phone', link: './contato', value: 'Ver', stats: 'Informações de Contato' }
  ];

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
  }

}
