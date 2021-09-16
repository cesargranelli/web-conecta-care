import { Component, Input, OnInit } from '@angular/core';
import { EnderecoPaciente } from 'src/app/pacientes/classes/endereco-paciente.class';

@Component({
  selector: 'app-tratamento-solicitacao-endereco',
  templateUrl: './tratamento-solicitacao-endereco.component.html',
  styleUrls: ['./tratamento-solicitacao-endereco.component.css']
})
export class TratamentoSolicitacaoEnderecoComponent implements OnInit {

  @Input()
  endereco: EnderecoPaciente;

  constructor() { }

  ngOnInit(): void {
  }

}
