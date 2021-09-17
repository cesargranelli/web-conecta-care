import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { ProfissionalAtendimento } from '../classes/profissional-atendimento.class';
import { TratamentoAberto } from '../classes/tratamento-aberto.class';
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
      this.tratamentoService.consultarTratamentoEmAberto(String(45), String(this.validService?.getValid()?.id))
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
    this.loading.emitChange(false);
  }

}
