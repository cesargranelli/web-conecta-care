import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Contato} from 'src/app/classes/contato.class';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ContatoService} from 'src/app/services/contato.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {ValidService} from '../../../shared/services/shared-valid.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;

  public contato: Contato;
  public validationHas: InputValidationHas;
  public contatoForm: FormGroup;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _service: ContatoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService,
    private _validService: ValidService
  ) {
    this._sharedLoadingService.emitChange(true);
    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null, Validators.maxLength(10)],
      telefoneRecado: [null, Validators.maxLength(10)],
      celularPrincipal: [null, [Validators.required, Validators.maxLength(11)]],
      celularSecundario: [null, Validators.maxLength(11)],
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dadosLocalStorage = this._validService.getValid();

    this._service.getDados(this._dadosLocalStorage.id).subscribe(dadosContato => {
      this.contato = dadosContato;
      this.popularForm();
      this._sharedLoadingService.emitChange(false);
    });

  }

  popularForm() {
    this.contatoForm.patchValue({
      telefoneFixo: this.contato.telefoneFixo,
      telefoneRecado: this.contato.telefoneRecado,
      celularPrincipal: this.contato.celularPrincipal,
      celularSecundario: this.contato.celularSecundario
    });
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this.contato = this.contatoForm.value;

    this.contato.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this.contato).subscribe(response => {
      setTimeout(() => {
        this._cadastro.contato = this.contato;
        this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/carreira`, {
          state: {valid: this._dadosLocalStorage}
        });
        this._sharedLoadingService.emitChange(false);
      });
    }, () => {
      this._sharedLoadingService.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir contatos',
        showConfirmButton: true
      });
    });
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/endereco`, {
      state: {valid: this._dadosLocalStorage}
    });
  }

}
