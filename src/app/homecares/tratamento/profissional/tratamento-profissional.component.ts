import { Component, Input, OnInit } from '@angular/core';
import { Especialidade } from 'src/app/classes/especialidade.class';
import { ProfissionalTratamentoAberto } from '../../classes/profissional-tratamento-aberto.class';

@Component({
  selector: 'app-tratamento-profissional',
  templateUrl: './tratamento-profissional.component.html',
  styleUrls: ['./tratamento-profissional.component.css']
})
export class TratamentoProfissionalComponent implements OnInit {

  @Input()
  profissional: ProfissionalTratamentoAberto;

  constructor() { }

  ngOnInit(): void {
  }

  especialidades(especialidades: Especialidade[]): any {
    if (!!especialidades)
      return especialidades?.map(especialidade => especialidade?.nome);
    return '';
  }

}
