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
    this.tratamentoService.adicionarTratamento(this.tratamento)
      .subscribe(() => {
        this.loading.emitChange(false);
        this.mensagemSwal('info', 'Novo tratamento adicionado com sucesso!', true);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error.status == 412) {
          this.loading.emitChange(false);
          this.mensagemSwal('warning', errorResponse.error?.data.message, true);
        } else {
          this.loading.emitChange(false);
          this.mensagemSwal('error', 'Falha ao tentar adicionar novo tratamento!', false);
        }
      }, () => this.loading.emitChange(false));
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
    console.log(this.tratamentoForm.value)
    let tratamento = new TratamentoAdicionar();
    tratamento.descricao = this.tratamentoForm.controls?.descricaoTratamento.value;
    tratamento.valorKilometragem = Number(this.tratamentoForm.controls?.valorDeslocamento.value);
    tratamento.pacienteId = this.paciente?.id;
    if (this.tratamentoForm.controls?.acompanhante.get('cpf').value) {
      tratamento.acompanhante = this.tratamentoForm.controls?.acompanhante.value;
      tratamento.acompanhante.dataNascimento = this.formatDate(new Date(tratamento.acompanhante.dataNascimento));
    }
    tratamento.profissionalId = this.profissional?.id;
    tratamento.homeCareId = this.validService?.getValid()?.id;
    tratamento.situacao = new SituacaoTratamento(null, new Date().toISOString(), StatusTratamento.ABERTO);
    console.log(tratamento)
    return tratamento;
  }

  private mensagemSwal(icon: any, title: string, navegar: boolean) {
    if (navegar) {
      this.router.navigate([`../em-andamento`], { relativeTo: this.activatedRoute });
    }
    
    Swal.fire({
      position: 'center',
      icon: icon,
      title: title,
      showConfirmButton: true
    });
  }

  private formatDate(data: Date): string {
    return String(data.getFullYear() + '-' + (data.getMonth() < 10 ? '0' + data.getMonth() : data.getMonth()) + '-' + (data.getDate() < 10 ? '0' + data.getDate() : data.getDate()));
  }

}
