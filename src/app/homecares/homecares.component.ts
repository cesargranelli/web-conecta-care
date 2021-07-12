import {Component, OnInit} from '@angular/core';
import {CalendarOptions, EventInput} from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/pt-br';
import {SharedLoadingService} from '../shared/services/shared-loading.service';
import {SharedValidService} from '../shared/services/shared-valid.service';
import {AtendimentoResumo} from './classes/atendimento-resumo.class';
import {AtendimentoService} from './services/atendimento.service';
import {StatusConverter} from './shared/utils/status.converter';

declare var jQuery: any;

@Component({
  selector: 'app-homecares',
  templateUrl: './homecares.component.html',
  styleUrls: ['./homecares.component.css']
})
export class HomeCaresComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: esLocale,
    fixedWeekCount: false,
    headerToolbar: {
      end: ''
    },
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit'
    },
    eventColor: '#5FA8D5',
    progressiveEventRendering: true,
    eventClick: this.modal.bind(this)
  };

  atendimentos: EventInput = new Array<EventInput>();
  statusConverter: StatusConverter = new StatusConverter();
  atendimentoId: number;

  constructor(
    private _valid: SharedValidService,
    private _loading: SharedLoadingService,
    private _atendimentoService: AtendimentoService
  ) {
    this._loading.emitChange(true);
  }

  ngOnInit(): void {
    this._atendimentoService.consultarResumo(this._valid.getValid().id).subscribe(response => {
      setTimeout(() => {
        response.body.data.map((atendimento: AtendimentoResumo) => {
          this.atendimentos.push({
            id: atendimento.id,
            date: this.getDateTime(atendimento.data, atendimento.hora),
            title: atendimento.nomePaciente,
            color: this.statusConverter.toColor(atendimento.status)
          });
          this.calendarOptions.events = this.atendimentos;
        });
      });
    }, null, () => this._loading.emitChange(false));
  }

  private getDateTime(date: string, time: string): string {
    return date + ' ' + time;
  }

  private modal(args: any) {
    this.atendimentoId = args.event._def.publicId;
    jQuery('#detalheAtendimentoModal').modal('show');
  }

}
