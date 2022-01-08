import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Contato } from 'src/app/classes/contato.class';
import { Estado } from 'src/app/classes/estado.class';
import { Modulo } from 'src/app/enums/modulo.enum';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import { ComplementoService } from '../../../../../services/complemento.service';
import { Paciente } from '../../../../classes/paciente.class';
import { PacienteService } from '../../../../services/paciente.service';

@Component({
  selector: 'app-form-complemento',
  templateUrl: './form-complemento.component.html',
  styleUrls: ['./form-complemento.component.css']
})
export class FormComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public validationHas: InputValidationHas = new InputValidationHas();
  public codigoPais = '+55';
  public estados: Array<Estado> = [];
  public hiddenForm: boolean;
  public contatoForm: FormGroup;
  private _contato: Contato;
  private paciente: Paciente;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _complementoService: ComplementoService,
    private _pacienteService: PacienteService,
    private _loading: SharedLoadingService
  ) {
    this.contatoForm = this._formBuilder.group({
      temTrabalho: [null],
      experienciaTrabalhoAtual: [null],
      celularPrincipal: [null, [Validators.required]],
      celularSecundario: [null],
    });
  }

  ngOnInit(): void {
    this._pacienteService.pesquisarPorId(this._validService.getValid(Modulo.Paciente).id)
      .pipe(map(paciente => this.paciente = paciente));
  }

  popularForm() {
    this.contatoForm.patchValue({
      telefoneFixo: this._contato?.telefoneFixo ? String(this._contato?.telefoneFixo).substring(2) : null,
      telefoneRecado: this._contato?.telefoneRecado ? String(this._contato?.telefoneRecado).substring(2) : null,
      celularPrincipal: this._contato?.celularPrincipal ? String(this._contato?.celularPrincipal).substring(2) : null,
      celularSecundario: this._contato?.celularSecundario ? String(this._contato?.celularSecundario).substring(2) : null
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this._contato = this.contatoForm.value;
    this._contato.proprietarioId = this._validService.getValid(Modulo.Paciente).id;
    this._contato.telefoneFixo = this._contato.telefoneFixo ? Number(String(this.codigoPais) + String(this._contato.telefoneFixo)) : null;
    this._contato.telefoneRecado = this._contato.telefoneRecado ? Number(String(this.codigoPais) + String(this._contato.telefoneRecado)) : null;
    this._contato.celularPrincipal = this._contato.celularPrincipal ? Number(String(this.codigoPais) + String(this._contato.celularPrincipal)) : null;
    this._contato.celularSecundario = this._contato.celularSecundario ? Number(String(this.codigoPais) + String(this._contato.celularSecundario)) : null;
  }


}
