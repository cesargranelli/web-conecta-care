import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from '../../../classes/atendimento-prontuario.class';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento-lista-atendimentos',
  templateUrl: './tratamento-lista-atendimentos.component.html',
  styleUrls: ['./tratamento-lista-atendimentos.component.css'],
})
export class TratamentoListaAtendimentosComponent implements OnInit {
  @Input()
  public atendimentos: Array<Atendimento>;

  constructor() {}

  ngOnInit(): void {}
}
