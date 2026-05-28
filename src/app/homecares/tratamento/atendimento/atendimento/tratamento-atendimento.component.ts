import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from '../../../classes/atendimento-prontuario.class';

declare var jQuery: any;

@Component({
  standalone: false,
  selector: 'app-tratamento-atendimento',
  templateUrl: './tratamento-atendimento.component.html',
  styleUrls: ['./tratamento-atendimento.component.css'],
})
export class TratamentoAtendimentoComponent implements OnInit {
  @Input()
  public atendimentos: Array<Atendimento>;

  constructor() {}

  ngOnInit(): void {}
}
