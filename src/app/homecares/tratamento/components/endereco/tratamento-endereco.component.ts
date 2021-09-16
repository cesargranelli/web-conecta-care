import { Component, Input, OnInit } from '@angular/core';
import { EnderecoPaciente } from 'src/app/pacientes/classes/endereco-paciente.class';

@Component({
  selector: 'app-tratamento-endereco',
  templateUrl: './tratamento-endereco.component.html',
  styleUrls: ['./tratamento-endereco.component.css']
})
export class TratamentoEnderecoComponent implements OnInit {

  @Input()
  endereco: EnderecoPaciente;

  constructor() { }

  ngOnInit(): void {
  }

}
