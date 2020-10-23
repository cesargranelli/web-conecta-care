import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventoService} from 'src/app/services/evento.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {Evento} from '../models/evento.class';
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
    private _eventoService: EventoService
  ) {
    this.idEvento = Number(this._route.snapshot.paramMap.get('id'));
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
