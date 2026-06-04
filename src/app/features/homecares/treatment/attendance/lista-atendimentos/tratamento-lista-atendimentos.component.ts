import { Component, Input, OnInit } from '@angular/core';
import { Atendimento } from 'src/app/core/models/atendimento-prontuario.model';

declare var jQuery: any;

@Component({
  standalone: false,
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
