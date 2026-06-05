import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusTratamento } from 'src/app/core/enums/status-tratamento.enum';
import { Paciente } from 'src/app/features/patients/models/paciente.model';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import Swal from 'sweetalert2';
import { Acompanhante } from 'src/app/features/homecares/models/acompanhante.model';
import { ProfissionalAtendimento } from 'src/app/features/homecares/models/profissional-atendimento.model';
import { SituacaoTratamento } from 'src/app/features/homecares/models/situacao-tratamento.model';
import { TratamentoAdicionar } from 'src/app/features/homecares/models/tratamento-adicionar.model';
import { TratamentoService } from '../../services/tratamento.service';

declare var jQuery: any;

import { TratamentoSolicitacaoPacienteComponent } from 'src/app/features/homecares/treatment/request/components/patient/tratamento-solicitacao-paciente.component';
import { TratamentoSolicitacaoEnderecoComponent } from 'src/app/features/homecares/treatment/request/components/address/tratamento-solicitacao-endereco.component';
import { TratamentoSolicitacaoAcompanhanteComponent } from 'src/app/features/homecares/treatment/request/components/acompanhante/tratamento-solicitacao-acompanhante.component';
import { TratamentoSolicitacaoProfissionalComponent } from 'src/app/features/homecares/treatment/request/components/professional/tratamento-solicitacao-profissional.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, TratamentoSolicitacaoPacienteComponent, TratamentoSolicitacaoEnderecoComponent, TratamentoSolicitacaoAcompanhanteComponent, TratamentoSolicitacaoProfissionalComponent],
  templateUrl: './solicitacao-tratamento.component.html',
  styleUrls: ['./solicitacao-tratamento.component.css']
})
export class SolicitacaoTratamentoComponent implements OnInit {

  tratamentoForm: FormGroup;

  paciente: Paciente;
  profissional: ProfissionalAtendimento;
  tratamento: TratamentoAdicionar;

  hideForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private tratamentoService: TratamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tratamentoForm = this.formBuilder.group({
      pacienteCpf: [null, [Validators.required, validCpf(true)]],
      profissionalCpf: [null, [Validators.required, validCpf(true)]],
      descricaoTratamento: [null, [Validators.required, Validators.maxLength(100)]],
      valorDeslocamento: [null],
      acompanhante: this.formBuilder.group({
        cpf: [null],
        nomeCompleto: [null],
        dataNascimento: [null],
        idade: [null],
        parentesco: [null],
        genero: [null],
        contato: this.formBuilder.group({
          telefoneResponsavel: [null],
          telefoneCelular: [null]
        })
      }),
      profissionalId: [null, Validators.required],
      pacienteId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.hideForm = false;
  }

  onSubmit() {
    this.loading.emitChange(true);
    this.tratamento = this.construirObjetoAdicionarTratamento();
    if (this.tratamento) {
      this.tratamentoService.adicionarTratamento(this.tratamento)
        .subscribe(() => {
          this.loading.emitChange(false);
          this.mensagemSwal('info', 'Novo tratamento adicionado com sucesso!', true);
        }, (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error.status == 412) {
            this.loading.emitChange(false);
            this.mensagemSwal('warning', errorResponse.error?.message, true);
          } else {
            this.loading.emitChange(false);
            this.mensagemSwal('error', 'Falha ao tentar adicionar novo tratamento!', false);
          }
        }, () => this.loading.emitChange(false));
    }
  }

  eventoPaciente(paciente: Paciente) {
    this.paciente = paciente;
    this.tratamentoForm.controls.pacienteId.setValue(this.paciente?.id);
  }

  eventoProfissional(profissional: ProfissionalAtendimento) {
    this.profissional = profissional;
    this.tratamentoForm.controls.profissionalId.setValue(this.profissional.id);
  }

  construirObjetoAdicionarTratamento(): TratamentoAdicionar {
    let tratamento = new TratamentoAdicionar();
    tratamento.descricao = this.tratamentoForm.controls?.descricaoTratamento.value;
    tratamento.valorKilometragem = Number(this.tratamentoForm.controls?.valorDeslocamento.value);
    tratamento.pacienteId = this.paciente?.id;
    if (this.tratamentoForm.controls?.acompanhante.get('cpf').value) {
      tratamento.acompanhante = this.tratamentoForm.controls?.acompanhante.value;
      if (!this.validarCamposAcompanhante(tratamento.acompanhante)) {
        this.mensagemSwal('info', 'Informações para cadastrar acompanhante incompletas!', false);
        return null;
      } else {
        tratamento.acompanhante.dataNascimento = this.formatDate(tratamento.acompanhante.dataNascimento);
      }
    }
    tratamento.profissionalId = this.profissional?.id;
    tratamento.homeCareId = this.validService?.getValid()?.id;
    tratamento.situacao = new SituacaoTratamento(null, new Date().toISOString(), StatusTratamento.ABERTO);
    return tratamento;
  }

  private mensagemSwal(icon: any, title: string, navegar: boolean) {
    if (navegar) {
      this.router.navigate([`../../treatment/em-andamento`], { relativeTo: this.activatedRoute });
    }

    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true
    });
    this.loading.emitChange(false);
  }

  private formatDate(data: string): string {
    return data.substring(6) + '-' + data.substring(3, 5) + '-' + data.substring(0, 2);
  }

  private validarCamposAcompanhante(acompanhante: Acompanhante): boolean {
    if (!!!acompanhante.cpf ||
      !!!acompanhante.nomeCompleto ||
      !!!acompanhante.dataNascimento ||
      !!!acompanhante.parentesco ||
      !!!acompanhante.genero ||
      !!!acompanhante.contato.telefoneResponsavel ||
      !!!acompanhante.contato.telefoneCelular
    ) {
      return false;
    }
    return true;
  }

}
