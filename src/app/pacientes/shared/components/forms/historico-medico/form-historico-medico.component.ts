import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-historico-medico',
  templateUrl: './form-historico-medico.component.html',
  styleUrls: ['./form-historico-medico.component.css']
})
export class FormHistoricoMedicoComponent implements OnInit {

  public historicoMedico: FormGroup;
  public hiddenForm: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
