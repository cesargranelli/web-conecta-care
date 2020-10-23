import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Contato} from 'src/app/classes/contato.class';
import {Pais} from 'src/app/classes/pais.class';
import {Role} from 'src/app/enums/role.enum';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ContatoService} from 'src/app/services/contato.service';
import {DominioService} from 'src/app/services/dominio.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {concatMap, map} from 'rxjs/operators';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public validationHas: InputValidationHas = new InputValidationHas();
  public codigoPais: string = '+55';
  public pais: Pais;
  public showForm: boolean = true;
  contatoForm: FormGroup;
  private _valid: Valid;
  private _contato: Contato;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: ContatoService,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._valid = this._validService.getValid();

    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      celularPrincipal: [null, [Validators.required]],
      celularSecundario: [null],
    });
  }

  ngOnInit(): void {
    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getPaises().pipe(
      map((response) => {
        this._loading.emitChange(true);
        let paises: Pais[] = response.body;
        this.pais = paises.find(pais => pais.id == Number(this._cadastro.endereco?.pais));
        if (this.pais) {
          this.codigoPais = '+' + Number(this.pais.codigo);
        }
      }),
      concatMap(() => this._service.getDados(this._valid.id))
    ).subscribe(response => {
      this._cadastro.contato = response;
      this._contato = response;
      this.popularForm();
      setTimeout(() => {
        this._loading.emitChange(false);
      });
    }, null, () => this.showForm = false);
  }

  popularForm() {
    this.contatoForm.patchValue({
      telefoneFixo: String(this._contato?.telefoneFixo),
      telefoneRecado: String(this._contato?.telefoneRecado),
      celularPrincipal: String(this._contato?.celularPrincipal),
      celularSecundario: String(this._contato?.celularSecundario)
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this._contato = this.contatoForm.value;
    if (this.contatoForm.value.telefoneFixo === 'll') {
      this._contato.telefoneFixo = null;
    }
    if (this.contatoForm.value.telefoneRecado === 'll') {
      this._contato.telefoneRecado = null;
    }
    if (this.contatoForm.value.celularSecundario === 'll') {
      this._contato.celularSecundario = null;
    }
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
