import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { Genero } from 'src/app/classes/genero.class';
import { Parentesco } from 'src/app/classes/parentesco.class';
import { DominioService } from 'src/app/services/dominio.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';

declare var jQuery: any;

@Component({
  selector: 'app-acompanhante-tratamento',
  templateUrl: './acompanhante-tratamento.component.html',
  styleUrls: ['./acompanhante-tratamento.component.css']
})
export class AcompanhanteTratamentoComponent implements OnInit {

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
        jQuery('select[id=\'parentesco\']').selectpicker('refresh');
        jQuery('select[id=\'genero\']').selectpicker('refresh');
        this.loading.emitChange(false);
      });
    });
  }

}
