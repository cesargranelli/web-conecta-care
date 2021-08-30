import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { PacienteService } from 'src/app/pacientes/services/paciente.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente-tratamento',
  templateUrl: './paciente-tratamento.component.html',
  styleUrls: ['./paciente-tratamento.component.css']
})
export class PacienteTratamentoComponent implements OnInit {

  @Input()
  tratamentoForm: FormGroup;

  @Output()
  eventoPaciente = new EventEmitter<Paciente>();

  paciente: Paciente;

  constructor(
    private loading: SharedLoadingService,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {
  }

  pesquisarPaciente(pacienteCpf: string): any {
    this.loading.emitChange(true);
    this.pacienteService.pesquisarPorCpf({ numero: pacienteCpf, tipo: 'CPF', modulo: 'PACIENTE' })
      .subscribe((paciente: Paciente) => {
        if (paciente) {
          this.eventoPaciente.emit(paciente);
          this.paciente = paciente;
        } else {
          this.showSwal('Paciente não localizado', 'info');
        }
      },
        (error: Error) => this.showSwal(error.message, 'error'),
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

  idade(dataNascimento: string) {
    if (dataNascimento) {
      let hoje: Date = new Date();
      let nascimento: Date = new Date(dataNascimento);
      let diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
      if (new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) <
        new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()))
        diferencaAnos--;
      return diferencaAnos;
    }
  }

}
