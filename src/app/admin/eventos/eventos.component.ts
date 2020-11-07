import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventoService} from 'src/app/services/evento.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';
import {Evento} from './models/evento.class';
import {map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public escondeTabela: boolean = true;
  public eventosFuturos: Array<Evento>;

  constructor(
    private _loading: SharedLoadingService,
    private _eventoService: EventoService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    this._eventoService.listarFuturos().pipe(
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
    this._eventoService.listarFuturos().pipe(
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

  enviarSms(id: number) {
    setTimeout(() => {
      this._loading.emitChange(true);
      this._eventoService.enviar(id).subscribe((response: any) => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: 'Foram enviadas ' + response.data?.quantidade + ' mensagens!',
          showConfirmButton: true
        });
      },
      () => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Não foi possível enviar mensagens!',
          showConfirmButton: true
        });
      });
    });
  }

  cancelarSms(id: number) {
    this._loading.emitChange(true);
    this._eventoService.cancelar(id).subscribe(() => {
        setTimeout(() => {
          this._loading.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Evento cancelado com sucesso!',
            showConfirmButton: true
          }).then(() => {
            this.escondeTabela = true;
            this.atualizaTabela();
          });
        });
      },
      () => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ops! Ocorreu um erro ao tentar cancelar o evento!',
          showConfirmButton: true
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
