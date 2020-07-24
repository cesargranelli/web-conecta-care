import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from 'src/app/classes/contato.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ContatoService } from 'src/app/services/contato.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  private _valid: Valid;
  private _contato: Contato;

  public validationHas: InputValidationHas = new InputValidationHas();

  contatoForm: FormGroup;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _service: ContatoService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._valid = this._validService.getValid();
  }

  ngOnInit(): void {

    this._loading.emitChange(true);

    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [this._cadastro.contato?.telefoneFixo, Validators.maxLength(10)],
      telefoneRecado: [this._cadastro.contato?.telefoneRecado, Validators.maxLength(10)],
      celularPrincipal: [this._cadastro.contato?.celularPrincipal, [Validators.required, Validators.maxLength(11)]],
      celularSecundario: [this._cadastro.contato?.celularSecundario, Validators.maxLength(11)],
    });

    this._loading.emitChange(false);

  }

  onSubmit() {
    this._loading.emitChange(true);
    this._contato = this.contatoForm.value;

    this._contato.proprietarioId = this._valid.id;

    this._service.save(this._contato).subscribe(response => {
      setTimeout(() => {
        this._cadastro.contato = this._contato;
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/carreira`);
        this._loading.emitChange(false);
      });
    },
    (error: Error) => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir contatos',
        showConfirmButton: true
      });
    });
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/endereco`);
  }

}
