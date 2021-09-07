import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusTratamento } from 'src/app/enums/status-tratamento.enum';
import { Paciente } from 'src/app/pacientes/classes/paciente.class';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import Swal from 'sweetalert2';
import { ProfissionalAtendimento } from '../../classes/profissional-atendimento.class';
import { SituacaoTratamento } from '../../classes/situacao-tratamento.class';
import { TratamentoAdicionar } from '../../classes/tratamento-adicionar.class';
import { TratamentoStorageService } from '../../services/tratamento-storage.service';
import { TratamentoService } from '../../services/tratamento.service';

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
  tratamento: TratamentoAdicionar;

  hideForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private tratamentoService: TratamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tratamentoStorageService: TratamentoStorageService
  ) {
    this.tratamentoForm = this.formBuilder.group({
      pacienteCpf: [null, [Validators.required, validCpf(true)]],
      profissionalCpf: [null, [Validators.required, validCpf(true)]],
      descricaoTratamento: [null, [Validators.required, Validators.maxLength(100)]],
      valorDeslocamento: [null],
      acompanhante: this.formBuilder.group({
        cpf: [null, [Validators.maxLength(11)]],
        nomeCompleto: [null, [Validators.maxLength(100)]],
        dataNascimento: [null, [Validators.minLength(10)]],
        idade: [null, [Validators.maxLength(3)]],
        parentesco: [null],
        genero: [null],
        contato: this.formBuilder.group({
          telefoneResponsavel: [null, [Validators.minLength(11)]],
          telefoneCelular: [null, [Validators.minLength(11)]]
        })
      })
    });
  }

  ngOnInit(): void {
    this.hideForm = false;
  }

  onSubmit() {
    this.loading.emitChange(true);
    this.tratamento = this.construirObjetoAdicionarTratamento();
    this.tratamentoService.adicionarTratamento(this.tratamento)
      .subscribe(() => {
        this.mensagemSwal('info', 'Novo tratamento adicionado com sucesso!')
          .then(() => this.buscarTratamentoEmAberto());
        this.loading.emitChange(false);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status == 412) {
          this.mensagemSwal('warning', errorResponse.error?.data.message);
          this.buscarTratamentoEmAberto();
          this.loading.emitChange(false);
          return;
        }
        this.mensagemSwal('error', 'Falha ao tentar adicionar novo tratamento!');
        this.loading.emitChange(false);
      }, () => this.loading.emitChange(false));
  }

  buscarTratamentoEmAberto() {
    this.tratamentoService.consultarTratamentoEmAberto(String(this.paciente.id), String(this.validService?.getValid()?.id))
      .subscribe(response => {
        this.tratamentoStorageService.tratamentoAberto = response.body?.data;
        this.router.navigate([`../`], { relativeTo: this.activatedRoute });
      });
  }

  eventoPaciente(paciente: Paciente) {
    this.paciente = paciente;
  }

  eventoProfissional(profissional: ProfissionalAtendimento) {
    this.profissional = profissional;
  }

  construirObjetoAdicionarTratamento(): TratamentoAdicionar {
    let tratamento = new TratamentoAdicionar();
    tratamento.descricao = this.tratamentoForm.controls?.descricaoTratamento.value;
    tratamento.valorKilometragem = Number(this.tratamentoForm.controls?.valorDeslocamento.value);
    tratamento.pacienteId = this.paciente?.id;
    if (this.tratamentoForm.controls?.acompanhante.get('cpf').value) {
      tratamento.acompanhante = this.tratamentoForm.controls?.acompanhante.value;
      tratamento.acompanhante.dataNascimento = new Date(tratamento.acompanhante.dataNascimento);
    }
    tratamento.profissionalId = this.profissional?.id;
    tratamento.homeCareId = this.validService?.getValid()?.id;
    tratamento.situacao = new SituacaoTratamento(null, new Date().toISOString(), StatusTratamento.ABERTO);
    return tratamento;
  }

  private mensagemSwal(icon: any, title: string) {
    return Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true,
    });
  }

}