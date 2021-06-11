import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/pt-br';
import { StatusAtendimento } from '../enums/status-atendimento.enum';
import { StatusColor } from '../enums/status-color.enum';
import { SharedLoadingService } from '../shared/services/shared-loading.service';
import { SharedValidService } from '../shared/services/shared-valid.service';
import { Atendimento } from './classes/atendimento.class';
import { AtendimentoService } from './services/atendimento.service';

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

  constructor(
    private _valid: SharedValidService,
    private _loading: SharedLoadingService,
    private _atendimentoService: AtendimentoService
  ) {
    this._loading.emitChange(true);
  }

  ngOnInit(): void {
    this._atendimentoService.consultar(this._valid.getValid().id).subscribe(response => {
      setTimeout(() => {
        response.body.data.map((atendimento: Atendimento) => {
          this.atendimentos.push({
            id: atendimento.id,
            date: this.getDateTime(atendimento.dataAgendamento, atendimento.horaAgendamento),
            title: atendimento.nomePaciente,
            color: this.getStatusColor(atendimento.status)
          });
          this.calendarOptions.events = this.atendimentos;
        });
      });
    }, null, () => this._loading.emitChange(false));
  }

  private getDateTime(date: string, time: string): string {
    return date + ' ' + time;
  }

  private getStatusColor(status: string): string {
    switch (status) {
      case StatusAtendimento.Agendado:
        return StatusColor.Agendado;
      case StatusAtendimento.Deslocamento:
        return StatusColor.Deslocamento;
      case StatusAtendimento.DeslocamentoAtrasado:
        return StatusColor.DeslocamentoAtrasado;
      case StatusAtendimento.CheckIn:
        return StatusColor.CheckIn;
      case StatusAtendimento.CheckInAtrasado:
        return StatusColor.CheckInAtrasado;
      case StatusAtendimento.CheckInManual:
        return StatusColor.CheckInManual;
      case StatusAtendimento.CheckInManualAtrasado:
        return StatusColor.CheckInManualAtrasado;
      case StatusAtendimento.Atrasado:
        return StatusColor.Atrasado;
      case StatusAtendimento.CheckOut:
        return StatusColor.Checkout;
      case StatusAtendimento.Cancelado:
        return StatusColor.Cancelado;
      default:
        break;
    }
  }

  private modal() {
    jQuery('#exampleModal').modal('show');
  }

}
