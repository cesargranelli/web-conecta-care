import {Component, EventEmitter, OnInit} from '@angular/core';
import {HistoricoMedicoPaciente} from '../../classes/historico-medico-paciente.class';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  public labelBotaoSubmit: string;
  public linkBotaoVoltar: string;
  public isCadastro = false;
  public onSubmitEvent = new EventEmitter<HistoricoMedicoPaciente>();

  constructor() { }

  ngOnInit(): void {
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    console.log(historicoMedicoPaciente);
  }

}
