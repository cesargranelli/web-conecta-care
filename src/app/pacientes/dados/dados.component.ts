import {Component, OnInit} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-dados',
  templateUrl: './dados.component.html',
  styleUrls: ['./dados.component.css']
})
export class DadosComponent implements OnInit {

  cards = [
    {icon: 'fingerprint', link: './login', value: 'Ver', stats: 'Informações de Login'},
    {icon: 'info', link: './informacoes-gerais', value: 'Ver', stats: 'Informações Gerais'},
    {icon: 'house', link: './endereco', value: 'Ver', stats: 'Endereço'},
    {icon: 'contact_phone', link: './contato', value: 'Ver', stats: 'Informações de Contato'},
    {icon: 'check_box', link: './complemento', value: 'Ver', stats: 'Informações Complementares'},
    {icon: 'check_box', link: './historico-medico', value: 'Ver', stats: 'Historico Medico'},
  ];

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
  }

}
