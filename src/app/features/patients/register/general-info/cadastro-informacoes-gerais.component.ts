import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Modulo } from 'src/app/core/enums/modulo.enum';
import Swal from "sweetalert2";
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { Paciente } from 'src/app/features/patients/models/paciente.model';
import { PacienteService } from "../../services/paciente.service";

import { FormInformacoesGeraisComponent } from 'src/app/features/patients/shared/components/forms/general-info/form-informacoes-gerais.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormInformacoesGeraisComponent],
  selector: 'app-informacoes-gerais',
  templateUrl: './cadastro-informacoes-gerais.component.html',
  styleUrls: ['./cadastro-informacoes-gerais.component.css']
})
export class CadastroInformacoesGeraisComponent implements OnInit {

  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public dadosLocalStorage: Valid;
  public onSubmitEvent: EventEmitter<Paciente>;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: PacienteService,
    private _router: Router,
  ) {
    this._loading.emitChange(true);
    this.dadosLocalStorage = this._validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
    this.isCadastro = true;
    this.linkBotaoVoltar = null;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(paciente: Paciente) {
    this._loading.emitChange(true);
    this._service.pesquisarPorId(paciente?.id).subscribe((pacienteCallback: Paciente) => {
      if (pacienteCallback) {
        this._service.alterar(paciente).subscribe(pacienteAtualizado => {
          this.dadosLocalStorage.id = pacienteAtualizado.id;
          this._validService.setValid(this.dadosLocalStorage);
          setTimeout(() => {
            this._router.navigateByUrl(`pacientes/${this.dadosLocalStorage.id}/register/endereco`);
            this._loading.emitChange(false);
          });
        }, () => {
          this._loading.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocorreu um erro inexperado ao tentar alterar as informações do profissional',
            showConfirmButton: true
          });
        });
      } else {
        this._service.registrar(paciente).subscribe(() => {
          this._validService.setValid(this.dadosLocalStorage);
          setTimeout(() => {
            this._router.navigateByUrl(`pacientes/${this.dadosLocalStorage.id}/register/endereco`);
            this._loading.emitChange(false);
          });
        }, () => {
          this._loading.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ocorreu um erro inexperado ao tentar alterar as informações do profissional',
            showConfirmButton: true
          });
        });
      }
    });

  }


}

