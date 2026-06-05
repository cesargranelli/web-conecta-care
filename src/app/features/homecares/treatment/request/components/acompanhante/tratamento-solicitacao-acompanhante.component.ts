import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { Genero } from 'src/app/core/models/genero.class';
import { Parentesco } from 'src/app/core/models/parentesco.class';
import { DominioService } from 'src/app/core/services/dominio.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'app-tratamento-solicitacao-acompanhante',
  templateUrl: './tratamento-solicitacao-acompanhante.component.html',
  styleUrls: ['./tratamento-solicitacao-acompanhante.component.css']
})
export class TratamentoSolicitacaoAcompanhanteComponent implements OnInit {

  @Input()
  tratamentoForm: FormGroup;

  generos: Genero[];
  parentescos: Parentesco[];

  constructor(
    private loading: SharedLoadingService,
    private dominioService: DominioService
  ) { }

  ngOnInit(): void {
    this.dominioService.getParentescos().pipe(
      map((response) => {
        this.parentescos = response.body;
      }),
      concatMap(() => this.dominioService.getGeneros().pipe(
        map(response => {
          this.generos = response.body;
        }))
      )
    ).subscribe(null, null, () => {
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        jQuery('.datetimepicker').datetimepicker({
          locale: 'pt-BR',
          format: 'L'
        });
        this.loading.emitChange(false);
      });
    });
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function () {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

}

