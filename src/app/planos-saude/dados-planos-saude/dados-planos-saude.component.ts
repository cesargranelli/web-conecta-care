import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-dados-planos-saude',
  templateUrl: './dados-planos-saude.component.html',
  styleUrls: ['./dados-planos-saude.component.css']
})
export class DadosPlanosSaudeComponent implements OnInit {

  cards = [
    {icon: 'fingerprint', link: './login', value: 'Ver', stats: 'Informações de Login'},
    {icon: 'info', link: './plano-saude', value: 'Ver', stats: 'Informações Gerais'},
    {icon: 'house', link: './endereco', value: 'Ver', stats: 'Informações de Endereço'},
    {icon: 'contact_phone', link: './contato', value: 'Ver', stats: 'Informações de Contato'}
  ];

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
  }

}
