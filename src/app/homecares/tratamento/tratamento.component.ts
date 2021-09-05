import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { ProfissionalAtendimento } from '../classes/profissional-atendimento.class';
import { TratamentoAberto } from '../classes/tratamento-aberto.class';
import { TratamentoStorageService } from '../services/tratamento-storage.service';
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
    private tratamentoStorageService: TratamentoStorageService,
    private tratamentoService: TratamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.tratamentoAbertoForm = this.formBuilder.group({
      observacaoTratamento: [null, [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    if (this.tratamentoStorageService?.tratamentoAberto?.id) {
      this.tratamentoAberto = this.tratamentoStorageService?.tratamentoAberto;
    }
    this.hideForm = false;
  }

  onSubmit() {
    this.loading.emitChange(true);
    this.loading.emitChange(false);
  }

}
