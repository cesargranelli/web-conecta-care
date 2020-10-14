import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-ver-dados',
  templateUrl: './card-ver-dados.component.html',
  styleUrls: ['./card-ver-dados.component.css']
})
export class CardVerDadosComponent implements OnInit {

  @Input() icon: string;
  @Input() link: string;
  @Input() value: string;
  @Input() stats: string;

  constructor() { }

  ngOnInit(): void {
  }

}
