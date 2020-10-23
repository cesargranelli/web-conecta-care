import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Evento} from 'src/app/admin/eventos/models/evento.class';
import {EventoService} from 'src/app/services/evento.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.css']
})
export class EventoDetalheComponent implements OnInit {

  public idEvento: number;
  public escondeTabela: boolean = true;
  public detalheEvento: Evento;

  constructor(
    private _loading: SharedLoadingService,
    private _route: ActivatedRoute,
    private _eventoService: EventoService,
    private _router: Router
  ) {
    this.idEvento = Number(this._route.snapshot.paramMap.get('idEvento'));
  }

  ngOnInit(): void {
    this._eventoService.detalhes(this.idEvento).pipe(
      tap(() => this._loading.emitChange(true)),
      map(response => {
        this.detalheEvento = response.body.data;
      })
    ).subscribe(
      null, null, () => {
        setTimeout(() => {
          this._loading.emitChange(false);
          this.escondeTabela = false;
        });
      });
  }
}
