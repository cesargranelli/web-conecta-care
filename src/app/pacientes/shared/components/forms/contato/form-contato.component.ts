import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { AreaAtendimento } from '../../../../../classes/area-atendimento.class';
import { Valid } from '../../../../../services/feat/Valid';
import { SharedLoadingService } from '../../../../../shared/services/shared-loading.service';
import { SharedValidService } from '../../../../../shared/services/shared-valid.service';
import { InputValidationHas } from '../../../../../shared/validations/input-validation-has';
import { ContatoPaciente } from '../../../../classes/contato-paciente.class';
import { Paciente } from '../../../../classes/paciente.class';
import { ContatoService } from '../../../../services/contato.service';
import { PacienteService } from '../../../../services/paciente.service';
import { Role } from 'src/app/enums/role.enum';

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
  public hideForm = true;
  public paciente: Paciente = new Paciente();

  private contato: ContatoPaciente;

  pacienteId: number;
  campoHabilitado: boolean;

  constructor(
    private _validService: SharedValidService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _contatoService: ContatoService,
    private _pacienteService: PacienteService,
    private _route: ActivatedRoute
  ) {
    this.pacienteId = this._route.snapshot.params.paciente_id;
    this.campoHabilitado = this._validService.getValid()?.role == Role.Paciente ? true : false;

    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      telefoneCelular: [null, [Validators.required]],
      telefoneResponsavel: [null],
      emailResponsavel: [null]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this._loading.emitChange(true);
    });
    this.validationHas = new InputValidationHas();
    this._pacienteService.pesquisarPorId(this.pacienteId).subscribe(response => {
      this.paciente = response;
      if (this.paciente?.contato) {
        setTimeout(() => {
          this.contato = this.paciente?.contato;
          this.popularForm();
          this.contatoForm.disable({ onlySelf: !this.campoHabilitado });
          this.hideForm = false;
        });
      }
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
    }, () => this._loading.emitChange(false));
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
    this.contato.idPaciente = this.pacienteId;
    this.onSubmitEvent.emit(this.contato);
  }

}
