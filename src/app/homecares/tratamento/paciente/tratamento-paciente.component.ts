import { Component, Input, OnInit } from '@angular/core';
import { PacienteTratamentoAberto } from '../../classes/paciente-tratamento-aberto.class';

@Component({
  selector: 'app-tratamento-paciente',
  templateUrl: './tratamento-paciente.component.html',
  styleUrls: ['./tratamento-paciente.component.css']
})
export class TratamentoPacienteComponent implements OnInit {

  @Input()
  paciente: PacienteTratamentoAberto;

  constructor() { }

  ngOnInit(): void {
  }

  idade(dataNascimento: string) {
    if (dataNascimento) {
      let hoje: Date = new Date();
      let nascimento: Date = new Date(dataNascimento);
      let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
      if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
        diferencaAnos--;
      return diferencaAnos;
    }
  }

}
