import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Valid} from '../../../../../services/feat/Valid';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputValidationHas} from '../../../../../shared/validations/input-validation-has';
import {AreaAtendimento} from '../../../../../classes/area-atendimento.class';
import {SharedValidService} from '../../../../../shared/services/shared-valid.service';
import {Router} from '@angular/router';
import {SharedLoadingService} from '../../../../../shared/services/shared-loading.service';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from 'sweetalert2';
import {ContatoPaciente} from '../../../../classes/contato-paciente.class';
import {ContatoService} from '../../../../services/contato.service';
import {concatMap} from 'rxjs/internal/operators/concatMap';
import {map} from 'rxjs/internal/operators/map';
import {PacienteService} from '../../../../services/paciente.service';
import {Paciente} from '../../../../classes/paciente.class';

@Component({
  selector: 'app-form-contato-paciente',
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class FormContatoComponent implements OnInit {

  @Input()
  public isCadastro: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Input()
  public labelBotaoSubmit: string;

  @Output()
  public onSubmitEvent = new EventEmitter<ContatoPaciente>();

  public valid: Valid;
  public contatoForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;
  public paciente: Paciente;

  private contato: ContatoPaciente;

  constructor(
    private _validService: SharedValidService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _contatoService: ContatoService,
    private _pacienteService: PacienteService,
  ) {
    this.valid = this._validService.getValid();
    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      telefoneCelular: [null, [Validators.required]],
      telefoneResponsavel: [null],
      emailResponsavel: [null]
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._pacienteService.pesquisarPorId(this._validService.getValid().id).pipe(
      map(paciente => this.paciente = paciente),
      concatMap(() => this._contatoService.consultar(this.paciente.contato.id)))
      .subscribe(response => {
        this.contato = response.body?.data;
        console.log(this.contato);
        if (this.contato) {
          this.popularForm();
        }
        this.hideForm = false;
        this._loading.emitChange(false);
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 0) {
          console.log('Sistema indisponível! ' + errorResponse.statusText);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Sistema indisponível! ' + errorResponse.statusText,
            showConfirmButton: true
          });
        }
      });
  }

  popularForm() {
    if (this.contato) {
      this.contatoForm.patchValue({
        telefoneFixo: this.contato.telefoneFixo,
        telefoneRecado: this.contato.telefoneRecado,
        telefoneCelular: this.contato.telefoneCelular,
        telefoneResponsavel: this.contato.telefoneResponsavel,
        emailResponsavel: this.contato.emailResponsavel,
      });
    }
  }

  onReturn() {
    this._router.navigateByUrl(`${this.linkBotaoVoltar}`);
  }

  limparForm() {
    this.contatoForm.reset();
  }

  onSubmit() {
    this.contato = this.contatoForm.value;
    this.onSubmitEvent.emit(this.contato);
  }


}
