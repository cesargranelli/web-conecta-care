import { Component, EventEmitter, OnInit, Output, AfterContentInit } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { Evento } from './models/evento.class';
import { EventoService } from './services/evento.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit, AfterContentInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public escondeTabela: boolean = true;
  public eventosFuturos: Array<Evento>;

  constructor(
    private _loading: SharedLoadingService,
    private _eventoService: EventoService
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this._eventoService.listarFuturos().pipe(
      map(response => {
        this._loading.emitChange(true);
        this.eventosFuturos = response.body.data;
      })
    ).subscribe(
      null, null, () => {
      setTimeout(() => {
        this.inicializarDataTable();
        this.inicializarTooltip();
        this.status(this.eventosFuturos);
        this._loading.emitChange(false);
        this.escondeTabela = false;
      });
    });
  }

  enviarSms(id: number) {
    this._eventoService.enviar(id).subscribe(() => {
      this._loading.emitChange(true);
      setTimeout(() => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Evento publicado com sucesso!',
          showConfirmButton: true
        });
      });
    },
    () => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Não foi possível publicar o novo evento!',
        showConfirmButton: true
      });
    });
  }

  cancelarSms(id: number) {
    console.log('Cancelar: ' + id);
  }

  status(eventos: Array<Evento>) {
    eventos.map(evento => evento.status = (evento.status == 'ABERTO') ? false : true);
  }

  inicializarDataTable() {
    jQuery(document).ready(function() {
      jQuery('#datatables').DataTable({
        "pagingType": "full_numbers",
        "lengthMenu": [
          [10, 25, 50, -1],
          [10, 25, 50, "All"]
        ],
        responsive: true,
        language: {
          search: "_INPUT_",
          searchPlaceholder: "Pesquisar",
        }
      });
    });
  }

  inicializarTooltip() {
    jQuery(function () {
      jQuery('.btn').tooltip()
    });
  }

}
