import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Role } from 'src/app/core/enums/role.enum';
import Swal from 'sweetalert2';
import { AreaAtendimento } from 'src/app/core/models/area-atendimento.class';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import { ContatoPaciente } from 'src/app/features/patients/models/contato-paciente.model';
import { Paciente } from 'src/app/features/patients/models/paciente.model';
import { ContatoService } from '../../../../services/contato.service';
import { PacienteService } from '../../../../services/paciente.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
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
    this.campoHabilitado = this._validService.getValid(Modulo.Paciente)?.role == Role.Paciente ? true : false;

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
      setTimeout(() => {
        this.contato = this.paciente?.contato;
        this.popularForm();
        // this.contatoForm.disable({ onlySelf: !this.campoHabilitado });
        this.hideForm = false;
      });
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

