import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/enums/modulo.enum';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { Responsavel } from 'src/app/pacientes/classes/responsavel.class';
import { DadosResponsavelDependenteService } from 'src/app/pacientes/shared/services/dados-responsavel-dependente.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
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

  pesquisaCpfForm: FormGroup;
  paciente: Paciente;
  hidePacienteCompletoForm: boolean = true;
  valid: Valid;
  desabilitarCampos: boolean = true;

  pesquisaNomeForm: FormGroup;
  pacientePesquisa: PacientePesquisa[];
  hidePesquisaNomeForm: boolean = true;
  hideDependentes: boolean = true;

  constructor(
    private validService: SharedValidService,
    private formBuilder: FormBuilder,
    private loading: SharedLoadingService,
    private pacienteService: PacienteService,
    private dados: DadosResponsavelDependenteService,
    private router: Router
  ) {
    this.pesquisaCpfForm = this.formBuilder.group({
      pacienteCpf: [null, [Validators.required, validCpf(true)]],
    });
    this.pesquisaNomeForm = this.formBuilder.group({
      nome: [null, [Validators.required]],
      cpf: [null]
    });
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
    this.valid = this.validService.getValid();
  }

  ngOnInit(): void {
    carregarTarjaAzul();
    injetaToolTip();
  }

  pesquisarPacientePorCpf(pacienteCpf: string): any {
    this.paciente = null;
    this.hidePacienteCompletoForm = true;
    this.loading.emitChange(true);
    this.pacienteService.consultarPacientePorCpf(pacienteCpf)
      .subscribe((paciente: any) => {
        setTimeout(() => {
          if (paciente) {
            this.paciente = paciente?.body?.data;
            this.hidePacienteCompletoForm = false;
            if (this.paciente.tipoPaciente.id == 1) {
              this.hideDependentes = false;
            } else {
              this.hideDependentes = true;
            }
            console.log(this.paciente)
          } else {
            this.showSwal('Paciente não localizado', 'info');
          }
        });
        this.loading.emitChange(false);
      },
        (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.showSwal('Paciente não cadastrado na plataforma', 'error');
          } else {
            this.showSwal(error.message, 'error');
          }
          this.loading.emitChange(false)
        },
        // () => this.loading.emitChange(false)
      );
  }

  pesquisarPacientePorNome(nome: string): any {
    this.paciente = null;
    this.hidePacienteCompletoForm = true;
    this.hidePesquisaNomeForm = true;
    this.loading.emitChange(true);
    this.pacienteService.consultarPacientePorNome(nome)
      .subscribe((pacientePesquisa: any) => {
        setTimeout(() => {
          if (pacientePesquisa) {
            this.pacientePesquisa = pacientePesquisa?.body?.data;
            this.hidePacienteCompletoForm = false;
            this.hidePesquisaNomeForm = false;
          } else {
            this.showSwal('Paciente não localizado', 'info');
          }
        });
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
            this.loading.emitChange(false);
          });
        }
      );
  }

  buscaPaciente() {
    this.pesquisarPacientePorCpf(this.pesquisaNomeForm.controls.cpf.value);
  }

  adicionaDependente(titularId: number) {
    console.log(titularId);
    this.dados.responsavel.modulo = Modulo.Homecare;
    this.dados.responsavel.responsavelCadastroId = this.valid.id;
    this.dados.responsavel.titularId = titularId;
    this.router.navigateByUrl(`pacientes/0/cadastro/informacoes-gerais`)
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
