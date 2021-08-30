import { Component, Input, OnInit } from '@angular/core';
import { EnderecoPaciente } from 'src/app/pacientes/classes/endereco-paciente.class';

@Component({
  selector: 'app-endereco-tratamento',
  templateUrl: './endereco-tratamento.component.html',
  styleUrls: ['./endereco-tratamento.component.css']
})
export class EnderecoTratamentoComponent implements OnInit {

  @Input()
  endereco: EnderecoPaciente;

  constructor() { }

  ngOnInit(): void {
  }

}
