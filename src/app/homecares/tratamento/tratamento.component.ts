import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusTratamento } from 'src/app/enums/status-tratamento.enum';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { ProfissionalAtendimento } from '../classes/profissional-atendimento.class';
import { SituacaoTratamento } from '../classes/situacao-tratamento.class';
import { TratamentoAberto } from '../classes/tratamento-aberto.class';
import { TratamentoEncerrar } from '../classes/tratamento-encerrar.class';
import { TratamentoService } from '../services/tratamento.service';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento',
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
