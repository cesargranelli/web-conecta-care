import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import Swal from 'sweetalert2';
import { PacientePesquisa } from '../classes/paciente-pesquisa.class';
import { PacienteService } from '../services/paciente.service';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js
declare function hideToolTip(): void; //Carrega a funcao hideToolTip() do app.js
declare function injetaToolTip(): void; //Carrega a funcao injetaToolTip() do app.js


@Component({
  selector: 'app-tratamento',
  templateUrl: './homecare-paciente.component.html',
  styleUrls: ['./homecare-paciente.component.css']
})
export class HomecarePacienteComponent implements OnInit {

  pacienteCompletoForm: FormGroup;
  paciente: Paciente;
  hidePacienteCompletoForm: boolean = true;

  pacientePesquisaForm: FormGroup;
  pacientePesquisa: PacientePesquisa[];
  hidePacientePesquisaForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loading: SharedLoadingService,
    private pacienteService: PacienteService
  ) {
    this.pacienteCompletoForm = this.formBuilder.group({
      pacienteCpf: [null, [Validators.required, validCpf(true)]],
    });
    this.pacientePesquisaForm = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cpf: [null]
    });
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    carregarTarjaAzul();
    injetaToolTip();
  }

  pesquisarPaciente(pacienteCpf: string): any {
    this.hidePacienteCompletoForm = true;
    this.loading.emitChange(true);
    this.pacienteService.consultarPacientePorCpf(pacienteCpf)
      .subscribe((paciente: any) => {
        if (paciente) {
          this.paciente = paciente?.body?.data;
          this.hidePacienteCompletoForm = false;
        } else {
          this.showSwal('Paciente não localizado', 'info');
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.showSwal('Paciente não cadastrado na plataforma', 'error');
          } else {
            this.showSwal(error.message, 'error');
          }
          this.loading.emitChange(false)
        },
        () => this.loading.emitChange(false)
      );

  }

  pesquisarPacientePorNome(nome: string): any {
    this.hidePacientePesquisaForm = true;
    this.loading.emitChange(true);
    this.pacienteService.consultarPacientePorNome(nome)
      .subscribe((pacientePesquisa: any) => {
        if (pacientePesquisa) {
          this.pacientePesquisa = pacientePesquisa?.body?.data;

          this.hidePacientePesquisaForm = false;
        } else {
          this.showSwal('Paciente não localizado', 'info');
        }
      },
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.showSwal('Não há nenhum paciente com esse nome cadastrado na plataforma!', 'error');
          } else {
            this.showSwal(error.message, 'error');
          }
          this.loading.emitChange(false)
        },
        () => {
          setTimeout(() => {
            jQuery(`select[id='cpf']`).selectpicker('refresh');
            // jQuery(`select[id='cpf']`).selectpicker('val', this.profissionalPesquisa?.cpf);
            this.loading.emitChange(false);
          });
        }
      );
  }

  buscaPaciente() {
    this.pesquisarPaciente(this.pacientePesquisaForm.controls?.cpf.value);
  }

  private showSwal(title: string, icon: any) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }

}
