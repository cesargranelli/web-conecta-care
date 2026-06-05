import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { AtendimentoResumo } from 'src/app/features/homecares/models/atendimento-resumo.model';
import { AtendimentoService } from './services/atendimento.service';
import { StatusConverter } from './shared/utils/status.converter';

declare var jQuery: any;

import { FullCalendarModule } from '@fullcalendar/angular';
import { ModalDetalheAtendimentoComponent } from 'src/app/features/homecares/shared/components/modal/detalhe-atendimento/modal-detalhe-atendimento.component';
import { ModalCriarTratamentoComponent } from 'src/app/features/homecares/shared/components/modal/criar-tratamento/modal-criar-tratamento.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FullCalendarModule, ModalDetalheAtendimentoComponent, ModalCriarTratamentoComponent],
  selector: 'app-homecares',
  templateUrl: './homecares.component.html',
  styleUrls: ['./homecares.component.css']
})
export class HomeCaresComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    locale: ptBrLocale,
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
      minute: '2-digit',
    },
    eventColor: '#5FA8D5',
    progressiveEventRendering: true,
    defaultTimedEventDuration: '00:00',
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
    if (this._valid.getValid().id)
      this._atendimentoService.consultarResumo(this._valid.getValid().id).subscribe(response => {
        setTimeout(() => {
          if (response.status == 200)
            response.body.map((atendimento: AtendimentoResumo) => {
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
