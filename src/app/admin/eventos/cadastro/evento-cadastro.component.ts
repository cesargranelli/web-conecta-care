import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Evento} from 'src/app/admin/eventos/models/evento.class';
import {EventoService} from 'src/app/services/evento.service';
import {AreaAtendimento} from 'src/app/classes/area-atendimento.class';
import {EnderecoViaCep} from 'src/app/classes/endereco-via-cep.class';
import {Estado} from 'src/app/classes/estado.class';
import {DominioService} from 'src/app/services/dominio.service';
import {EnderecoService} from 'src/app/services/endereco.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {concatMap, map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-evento-cadastro',
  templateUrl: './evento-cadastro.component.html',
  styleUrls: ['./evento-cadastro.component.css']
})
export class EventoCadastroComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public escondeFormulario: boolean = true;
  public estados: Array<Estado>;
  public areasAtendimento: Array<AreaAtendimento>;
  public validationHas: InputValidationHas = new InputValidationHas();
  public eventoForm: FormGroup;
  public evento: Evento;
  public estadoViaCep: Estado;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _eventoService: EventoService,
    private _serviceEndereco: EnderecoService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');

    this.eventoForm = this._formBuilder.group({
      titulo: [null, [Validators.required, Validators.maxLength(50)]],
      descricao: [null, [Validators.required, Validators.maxLength(100)]],
      detalhe: [null, [Validators.required, Validators.maxLength(255)]],
      cep: [null, [Validators.required, Validators.maxLength(8)]],
      logradouro: [null, [Validators.required, Validators.maxLength(255)]],
      numero: [null, [Validators.required, Validators.maxLength(10)]],
      bairro: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      data: [null, Validators.required],
      hora: [null, Validators.required],
      duracao: [1, Validators.required],
      vagas: [1, Validators.required],
      estado: [null, Validators.required],
      areaAtendimento: [null, Validators.required],
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
          this.areasAtendimento = response.body;
        }))
      )
    ).subscribe(() => {
      setTimeout(() => {
        this.initDateTimePicker();
        jQuery(`select[id='estado']`).selectpicker('refresh');
        jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
        this._loading.emitChange(false);
        this.escondeFormulario = false;
      });
    }, () => {
      this._loading.emitChange(false);
    });

  }

  initDateTimePicker() {
    jQuery('#datepicker').datetimepicker({
      minDate: Date.now(),
      format: 'L',
      locale: 'pt-br',
      icons: {
        date: 'fa fa-calendar',
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
    jQuery('#datepicker').on('dp.change', function(event: any) {
      if (event.date) {
        form.controls.data.setValue(event.date?._d.toLocaleDateString());
      }
    });
  }

  timeChange(form: FormGroup) {
    jQuery('#timepicker').on('dp.change', function(event: any) {
      if (event.date) {
        form.controls.hora.setValue(event.date?._d.toTimeString().substring(0, 5));
      }
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this.evento = this.eventoForm.value;
    this.evento.data = new Date(Number(this.evento.data.split('/')[2]), Number(this.evento.data.split('/')[1]) - 1, Number(this.evento.data.split('/')[0])).toISOString();
    this._eventoService.cadastrar(this.evento).subscribe(response => {
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
            jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
            this._router.navigateByUrl(`admin/eventos`);
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
    this._loading.emitChange(false);
  }

  pesquisarCep() {
    this._serviceEndereco.findViaCep(this.eventoForm.controls.cep.value).subscribe(
      response => {
        if (response.body?.erro) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '400-CEP Não localizado!',
            showConfirmButton: true,
          });
        }
        this._loading.emitChange(true);
        let enderecoViaCep: EnderecoViaCep = response.body;
        this.eventoForm.controls.logradouro.setValue(enderecoViaCep.logradouro);
        this.eventoForm.controls.bairro.setValue(enderecoViaCep.bairro);
        this.eventoForm.controls.cidade.setValue(enderecoViaCep.localidade);
        this.estadoViaCep = this.estados.find(estado => estado.uf == enderecoViaCep.uf);
      },
      (error: Error) => Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.message,
        showConfirmButton: true,
      }),
      () => {
        setTimeout(() => {
          jQuery('select[id=\'estado\']').selectpicker('refresh');
          jQuery('select[id=\'estado\']').selectpicker('val', this.estadoViaCep.id);
          this._loading.emitChange(false);
        });
      });
  }
}
