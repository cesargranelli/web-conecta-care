import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-historico-medico',
  templateUrl: './cadastro-historico-medico.component.html',
  styleUrls: ['./cadastro-historico-medico.component.css']
})
export class CadastroHistoricoMedicoComponent implements OnInit {

  public historicoMedico: FormGroup;
  public hiddenForm: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
