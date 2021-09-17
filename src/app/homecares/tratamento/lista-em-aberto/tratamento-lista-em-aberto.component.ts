import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { TratamentoAbertoLista } from '../../classes/tratamento-aberto-lista.class';
import { TratamentoService } from '../../services/tratamento.service';

declare var jQuery: any;

@Component({
  selector: 'app-tratamento-lista-em-aberto',
  templateUrl: './tratamento-lista-em-aberto.component.html',
  styleUrls: ['./tratamento-lista-em-aberto.component.css']
})
export class TratamentoListaEmAbertoComponent implements OnInit {

  hideForm: boolean = true;

  tratamentosEmAberto: Array<TratamentoAbertoLista>;

  constructor(
    private validService: SharedValidService,
    private loading: SharedLoadingService,
    private tratamentoService: TratamentoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.loading.emitChange(true);
  }

  ngOnInit(): void {
    this.tratamentoService.listarTratamentoEmAberto(String(this.validService.getValid()?.id))
      .subscribe(tratamentos => {
        this.tratamentosEmAberto = tratamentos;
        this.inicializarDataTable();
        this.loading.emitChange(false);
        this.hideForm = false;
      },
        () => this.loading.emitChange(false),
        () => this.loading.emitChange(false)
      );
  }

  onSubmit() {
  }

  inicializarDataTable() {
    jQuery(document).ready(function () {
      jQuery('#datatables').DataTable({
        'pagingType': 'full_numbers',
        'lengthMenu': [
          [10, 25, 50, -1],
          [10, 25, 50, 'All']
        ],
        responsive: true,
        language: {
          search: '_INPUT_',
          searchPlaceholder: 'Pesquisar',
          lengthMenu: 'Mostrar _MENU_',
          info: 'Mostrando _START_ à _END_ de _TOTAL_ registros'
        }
      });
    });
  }

}
