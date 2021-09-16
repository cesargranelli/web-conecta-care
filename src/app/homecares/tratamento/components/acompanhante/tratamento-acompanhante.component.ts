import { Component, Input, OnInit } from '@angular/core';
import { AcompanhanteTratamentoAberto } from 'src/app/homecares/classes/acompanhante-tratamento-aberto.class';

@Component({
  selector: 'app-tratamento-acompanhante',
  templateUrl: './tratamento-acompanhante.component.html',
  styleUrls: ['./tratamento-acompanhante.component.css']
})
export class TratamentoAcompanhanteComponent implements OnInit {

  @Input()
  acompanhante: AcompanhanteTratamentoAberto;

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
