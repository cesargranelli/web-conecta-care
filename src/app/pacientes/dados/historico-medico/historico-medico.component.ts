import {Component, EventEmitter, OnInit} from '@angular/core';
import {HistoricoMedicoPaciente} from '../../classes/historico-medico-paciente.class';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-historico-medico',
  templateUrl: './historico-medico.component.html',
  styleUrls: ['./historico-medico.component.css']
})
export class HistoricoMedicoComponent implements OnInit {

  public labelBotaoSubmit: string;
  public linkBotaoVoltar: string;
  public isCadastro = false;
  public onSubmitEvent = new EventEmitter<HistoricoMedicoPaciente>();

  constructor() {
  }

  ngOnInit(): void {
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    console.log(historicoMedicoPaciente);
  }

}
