import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { Estado } from 'src/app/classes/estado.class';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { EventoService } from '../services/evento.service';
import { Evento } from './models/evento.class';

declare var jQuery: any;

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;
  private _serviceSubscription: Subscription;
  private _dominioSubscription: Subscription;

  public estados: Array<Estado>;
  public especialidades: Array<AreaAtendimento>;
  public validationHas: InputValidationHas = new InputValidationHas();
  public eventoForm: FormGroup;
  public evento: Evento;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _eventoService: EventoService
  ) {
    this.eventoForm = this._formBuilder.group({
      titulo: [null, [Validators.required, Validators.maxLength(50)]],
      descricao: [null, [Validators.required, Validators.maxLength(255)]],
      local: [null, [Validators.required, Validators.maxLength(255)]],
      data: [null, Validators.required],
      hora: [null, Validators.required],
      estado: [null, Validators.required],
      especialidades: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._dominioService.getEstados().pipe(
      map(response => {
        this._loading.emitChange(true);
        this.estados = response.body;
      }),
      concatMap(() => this._dominioService.getAreasAtendimento().pipe(
        map(response => {
          this.especialidades = response.body;
        }))
      )
    ).subscribe(() => {
      setTimeout(() => {
        jQuery(`select[id='estado']`).selectpicker('refresh');
        jQuery(`select[id='especialidade']`).selectpicker('refresh');
        this._loading.emitChange(false);
      });
    }, () => {
      this._loading.emitChange(false);
    });

    this.initDateTimePicker();
  }

  initDateTimePicker() {
    jQuery('#datepicker').datetimepicker({
      format: 'L',
      locale: 'pt-br',
      icons: {
        date: "fa fa-calendar",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot'
    }
    });
    jQuery('#timepicker').datetimepicker({
      format: 'LT',
      locale: 'pt-br',
      icons: {
        time: 'fa fa-clock-o',
        up: 'fa fa-chevron-up',
        down: 'fa fa-chevron-down'
    }
    });
  }

  dateChange(form: FormGroup) {
    jQuery("#datepicker").on("dp.change", function (event: any) {
      if (event.date)
        form.controls.data.setValue(event.date?._d.toLocaleDateString());
    });
  }

  timeChange(form: FormGroup) {
    jQuery("#timepicker").on("dp.change", function (event: any) {
      if (event.date)
        form.controls.hora.setValue(event.date?._d.toTimeString().substring(0, 5));
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this.evento = this.eventoForm.value;
    console.log(this.evento);
    this._eventoService.save(this.evento).subscribe(response => {
      setTimeout(() => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Evento publicado com sucesso!',
          showConfirmButton: true
        }).then(() => {
          this.eventoForm.reset();
          jQuery(`select[id='estado']`).selectpicker('refresh');
          jQuery(`select[id='especialidade']`).selectpicker('refresh');
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
}
