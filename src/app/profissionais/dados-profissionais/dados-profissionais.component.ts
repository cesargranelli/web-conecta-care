import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-dados-profissionais',
  templateUrl: './dados-profissionais.component.html',
  styleUrls: ['./dados-profissionais.component.css']
})
export class DadosProfissionaisComponent implements OnInit {

  cards = [
    {icon: 'fingerprint', link: './login', value: 'Ver', stats: 'Informações de Login'},
    {icon: 'info', link: './informacoes-gerais', value: 'Ver', stats: 'Informações Gerais'},
    {icon: 'work', link: './carreira', value: 'Ver', stats: 'Informações Profissionais'},
    {icon: 'house', link: './endereco', value: 'Ver', stats: 'Endereço'},
    {icon: 'build', link: './experiencia', value: 'Ver', stats: 'Experiência Profissional'},
    {icon: 'school', link: './escolaridade', value: 'Ver', stats: 'Informações Acadêmicas'},
    {icon: 'account_balance', link: './conta', value: 'Ver', stats: 'Informações Bancárias'},
    {icon: 'check_box', link: './complemento', value: 'Ver', stats: 'Informações Complementares'},
    {icon: 'contact_phone', link: './contato', value: 'Ver', stats: 'Informações de Contato'},
  ];

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
  }

}
