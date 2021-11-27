import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import Swal from 'sweetalert2';
import { PacienteService } from '../services/paciente.service';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento',
  templateUrl: './homecare-paciente.component.html',
  styleUrls: ['./homecare-paciente.component.css']
})
export class HomecarePacienteComponent implements OnInit {

  pacienteForm: FormGroup;

  paciente: Paciente;

  hideForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loading: SharedLoadingService,
    private pacienteService: PacienteService
  ) {
    this.pacienteForm = this.formBuilder.group({
      pacienteCpf: [null, [Validators.required, validCpf(true)]],
    });

  }

  ngOnInit(): void {
  }

  pesquisarPaciente(pacienteCpf: string): any {
    this.hideForm = true;
    this.loading.emitChange(true);
    console.log(pacienteCpf);
    this.pacienteService.consultarPacientePorCpf(pacienteCpf)
      .subscribe((paciente: any) => {
        if (paciente) {
          this.paciente = paciente?.body?.data;
          this.hideForm = false;
          console.log(this.paciente);
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

  private showSwal(title: string, icon: any) {
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }

}
