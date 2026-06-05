import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusTratamento } from 'src/app/core/enums/status-tratamento.enum';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { ProfissionalAtendimento } from 'src/app/features/homecares/models/profissional-atendimento.model';
import { SituacaoTratamento } from 'src/app/features/homecares/models/situacao-tratamento.model';
import { TratamentoAberto } from 'src/app/features/homecares/models/tratamento-aberto.model';
import { TratamentoEncerrar } from 'src/app/features/homecares/models/tratamento-encerrar.model';
import { TratamentoService } from '../services/tratamento.service';
import { TratamentoStorageService } from '../services/tratamento-storage.service';

declare var jQuery: any;

import { TratamentoPacienteComponent } from 'src/app/features/homecares/treatment/components/patient/tratamento-paciente.component';
import { TratamentoEnderecoComponent } from 'src/app/features/homecares/treatment/components/address/tratamento-endereco.component';
import { TratamentoAcompanhanteComponent } from 'src/app/features/homecares/treatment/components/acompanhante/tratamento-acompanhante.component';
import { TratamentoProfissionalComponent } from 'src/app/features/homecares/treatment/components/professional/tratamento-profissional.component';
import { TratamentoListaAtendimentosComponent } from 'src/app/features/homecares/treatment/attendance/lista-atendimentos/tratamento-lista-atendimentos.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, TratamentoPacienteComponent, TratamentoEnderecoComponent, TratamentoAcompanhanteComponent, TratamentoProfissionalComponent, TratamentoListaAtendimentosComponent],
  templateUrl: './tratamento.component.html',
  styleUrls: ['./tratamento.component.css']
})
export class TratamentoComponent implements OnInit {

  tratamentoAbertoForm: FormGroup;

  profissional: ProfissionalAtendimento;
  tratamentoAberto: TratamentoAberto;
  tratamento: TratamentoEncerrar;

  hideForm: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private tratamentoService: TratamentoService,
    private tratamentoStorage: TratamentoStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading.emitChange(true);
    this.tratamentoAbertoForm = this.formBuilder.group({
      observacaoTratamento: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    if (history.state?.pacienteId) {
      this.tratamentoService.consultarTratamentoEmAberto(String(history.state?.pacienteId), String(this.validService?.getValid()?.id))
        .subscribe(response => {
          if (response) {
            this.tratamentoAberto = response.body?.data;
            this.tratamentoStorage.tratamentoAberto = this.tratamentoAberto;
            this.loading.emitChange(false);
            this.hideForm = false;
          } else {
            this.loading.emitChange(false);
            this.router.navigate([`../`], { relativeTo: this.activatedRoute });
          }
        });
    } else {
      this.router.navigate([`../`], { relativeTo: this.activatedRoute });
    }
  }

  onSubmit() {
    this.loading.emitChange(true);
    this.tratamento = this.construirObjetoEncerrarTratamento();
    this.tratamentoService.encerrarTratamento(this.tratamento)
      .subscribe(() => {
        this.loading.emitChange(false);
        this.mensagemSwal('info', 'Tratamento encerrado com sucesso!')
        this.router.navigate([`../`], { relativeTo: this.activatedRoute });
      }, () => this.mensagemSwal('error', 'Falha ao tentar encerrar novo tratamento!'));
  }

  construirObjetoEncerrarTratamento(): TratamentoEncerrar {
    let tratamento = new TratamentoEncerrar();
    tratamento.tratamentoId = this.tratamentoAberto?.id;
    tratamento.observacao = String(this.tratamentoAbertoForm.controls?.observacaoTratamento.value);
    tratamento.situacao = new SituacaoTratamento(null, new Date().toISOString(), StatusTratamento.ENCERRADO);
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
