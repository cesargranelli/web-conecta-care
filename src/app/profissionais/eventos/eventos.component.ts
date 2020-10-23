import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Evento} from 'src/app/admin/eventos/models/evento.class';
import {Valid} from 'src/app/services/feat/Valid';
import {ProfissionalService} from 'src/app/services/profissional.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any;
  public valid: Valid;
  public escondeTabela: boolean = true;
  public eventosFuturos: Array<Evento>;
  public statusConfirmado: boolean = false;
  public statusRejeitado: boolean = false;
  private idProfissional: number;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _profissionalService: ProfissionalService,
    private _validService: SharedValidService,
    private _loading: SharedLoadingService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.idProfissional = Number(this._activeRoute.snapshot.paramMap.get('id'));
    this._profissionalService.listarEventos(this.idProfissional).pipe(
      map(response => {
        this._loading.emitChange(true);
        this.eventosFuturos = response.body.data;
      })
    ).subscribe(
      null, null, () => {
        setTimeout(() => {
          this.inicializarDataTable();
          this._loading.emitChange(false);
          this.escondeTabela = false;
        });
      });
  }

  atualizaTabela() {
    this._profissionalService.listarEventos(this.idProfissional).pipe(
      map(response => {
        this._loading.emitChange(true);
        this.eventosFuturos = response.body.data;
      })
    ).subscribe(
      null, null, () => {
        setTimeout(() => {
          this._loading.emitChange(false);
          this.escondeTabela = false;
        });
      });
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

  confirmarEvento(idEvento: number) {
    this._loading.emitChange(true);
    this._profissionalService.confirmarEvento(this.valid.id, idEvento).subscribe(() => {
        setTimeout(() => {
          this._loading.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Confirmação da participação no evento!',
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
          title: 'Não foi possível publicar o novo evento!',
          showConfirmButton: true
        });
      });
  }

  rejeitarEvento(idEvento: number) {
    this._loading.emitChange(true);
    this._profissionalService.rejeitarEvento(this.valid.id, idEvento).subscribe(() => {
        setTimeout(() => {
          this._loading.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Confirmação de não participação no evento!',
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
}
