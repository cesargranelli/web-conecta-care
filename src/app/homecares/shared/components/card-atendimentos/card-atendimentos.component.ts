import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/homecares/classes/atendimento-prontuario.class';

@Component({
  selector: 'app-card-atendimentos',
  templateUrl: './card-atendimentos.component.html',
  styleUrls: ['./card-atendimentos.component.css'],
})
export class CardAtendimentosComponent implements OnInit {
  @Input()
  public atendimentos: Array<Atendimento>;

  constructor() {}

  ngOnInit(): void {}
}
