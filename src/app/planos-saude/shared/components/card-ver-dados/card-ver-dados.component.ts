import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-ver-dados-planos-saude',
  templateUrl: './card-ver-dados.component.html',
  styleUrls: ['./card-ver-dados.component.css']
})
export class CardVerDadosComponent implements OnInit {

  @Input() icon: string;
  @Input() link: string;
  @Input() value: string;
  @Input() stats: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
