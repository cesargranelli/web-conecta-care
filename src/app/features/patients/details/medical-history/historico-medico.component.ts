import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { HistoricoMedicoPaciente } from 'src/app/features/patients/models/historico-medico-paciente.model';
import { HistoricoMedicoService } from '../../services/historico-medico.service';
import { FormHistoricoMedicoComponent } from 'src/app/features/patients/shared/components/forms/medical-history/form-historico-medico.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormHistoricoMedicoComponent],
  selector: 'app-historico-medico',
  templateUrl: './historico-medico.component.html',
  styleUrls: ['./historico-medico.component.css']
})
export class HistoricoMedicoComponent implements OnInit {

  public labelBotaoSubmit: string;
  public linkBotaoVoltar: string;
  public isCadastro = false;
  public onSubmitEvent = new EventEmitter<HistoricoMedicoPaciente>();

  constructor(private validService: SharedValidService,
    private loading: SharedLoadingService,
    private historicoMedicoService: HistoricoMedicoService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(historicoMedicoPaciente: HistoricoMedicoPaciente) {
    this.loading.emitChange(true);
    this.historicoMedicoService.alterar(historicoMedicoPaciente).subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl(`pacientes/${this.validService.getValid(Modulo.Paciente).id}/dados`);
        this.loading.emitChange(false);
      });
    },
      () => {
        this.loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar alterar os dados',
      showConfirmButton: true
    });
  }

}

