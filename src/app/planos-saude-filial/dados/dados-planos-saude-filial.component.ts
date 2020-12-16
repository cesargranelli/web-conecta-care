import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-dados-planos-saude-filial',
  templateUrl: './dados-planos-saude-filial.component.html',
  styleUrls: ['./dados-planos-saude-filial.component.css']
})
export class DadosPlanosSaudeFilialComponent implements OnInit {

  cards = [
    { icon: 'fingerprint', link: './login', value: 'Ver', stats: 'Informações de Login' },
    { icon: 'info', link: './plano-saude-filial', value: 'Ver', stats: 'Informações Gerais' },
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
