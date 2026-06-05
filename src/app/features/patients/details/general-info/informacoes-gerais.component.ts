import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { Paciente } from 'src/app/features/patients/models/paciente.model';
import { PacienteService } from '../../services/paciente.service';
import { FormInformacoesGeraisComponent } from 'src/app/features/patients/shared/components/forms/general-info/form-informacoes-gerais.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormInformacoesGeraisComponent],
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public valid: Valid;

  constructor(
    private pacienteService: PacienteService,
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private router: Router) {
    this.valid = this.validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
    this.isCadastro = false;
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(paciente: Paciente) {
    this.pacienteService.alterar(paciente).subscribe(paciente => {
      setTimeout(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigateByUrl(`/pacientes/${this.valid.id}/dados`);
        this.loading.emitChange(false);
      });
    }, (err) => {
      this.message();
    });
  }

  message() {
    this.loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar atualizar os dados',
      showConfirmButton: true
    });
  }

}

