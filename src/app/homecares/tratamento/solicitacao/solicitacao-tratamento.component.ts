import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import { ProfissionalAtendimento } from '../../classes/profissional-atendimento.class';

declare var jQuery: any;

@Component({
  selector: 'app-solicitacao-tratamento',
  templateUrl: './solicitacao-tratamento.component.html',
  styleUrls: ['./solicitacao-tratamento.component.css']
})
export class SolicitacaoTratamentoComponent implements OnInit {

  tratamentoForm: FormGroup;

  paciente: Paciente;
  profissional: ProfissionalAtendimento;

  hideForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.tratamentoForm = this.formBuilder.group({
      pacienteCpf: [null, [Validators.required, validCpf(true)]],
      profissionalCpf: [null, [Validators.required, validCpf(true)]],
      descricaoTratamento: [null],
      valorDeslocamento: [null],
      acompanhante: this.formBuilder.group({
        cpf: [null, [Validators.required, validCpf(true)]],
        nomeCompleto: [null, [Validators.maxLength(100)]],
        dataNascimento: [null, [Validators.minLength(10)]],
        idade: [null, [Validators.minLength(3)]],
        parentesco: [null],
        genero: [null],
        telefone: [null, [Validators.minLength(11)]],
        celular: [null, [Validators.minLength(11)]]
      })
    });
  }

  ngOnInit(): void {
    this.hideForm = false;
  }

  onSubmit() {
    console.log(this.tratamentoForm)
  }

  eventoPaciente(paciente: Paciente) {
    this.paciente = paciente;
  }

  eventoProfissional(profissional: ProfissionalAtendimento) {
    this.profissional = profissional;
  }

}
