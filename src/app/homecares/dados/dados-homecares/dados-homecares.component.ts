import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-dados-homecares',
  templateUrl: './dados-homecares.component.html',
  styleUrls: ['./dados-homecares.component.css']
})
export class DadosHomecaresComponent implements OnInit {

  cards = [
    {icon: 'fingerprint', link: './informacoes-login', value: 'Ver', stats: 'Informações de Login'}
  ];

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
  }

}
