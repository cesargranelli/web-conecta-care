import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HistoricoMedicoPaciente} from '../../classes/historico-medico-paciente.class';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public contatoFormGroup: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.isCadastro = false;
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    console.log(historicoMedicoPaciente);
  }
}
