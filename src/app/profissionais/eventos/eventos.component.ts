import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Evento } from 'src/app/admin/eventos/models/evento.class';
import { Valid } from 'src/app/services/feat/Valid';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any;

  private idProfissional: number;
  private valid: Valid;

  public escondeTabela: boolean = true;
  public eventosFuturos: Array<Evento>;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _service: ProfissionalService,
    private _validService: SharedValidService,
    private _loading: SharedLoadingService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.idProfissional = Number(this._activeRoute.snapshot.paramMap.get('id'));
    this._service.eventos(this.idProfissional).pipe(
      map(response => {
        this._loading.emitChange(true);
        this.eventosFuturos = response.body.data;
      })
    ).subscribe(
      null, null, () => {
      setTimeout(() => {
        this.inicializarDataTable();
        this.status(this.eventosFuturos);
        this._loading.emitChange(false);
        this.escondeTabela = false;
      });
    });
  }

  atualizaTabela() {
    this._service.eventos(this.idProfissional).pipe(
      map(response => {
        this._loading.emitChange(true);
        this.eventosFuturos = response.body.data;
      })
    ).subscribe(
      null, null, () => {
      setTimeout(() => {
        this.status(this.eventosFuturos);
        this._loading.emitChange(false);
        this.escondeTabela = false;
      });
    });
  }

  status(eventos: Array<Evento>) {
    eventos.map(evento => evento.status = (evento.status == 'ABERTO') ? false : true);
  }

  inicializarDataTable() {
    jQuery(document).ready(function() {
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
