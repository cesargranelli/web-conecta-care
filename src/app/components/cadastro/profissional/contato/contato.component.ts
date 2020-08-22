import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Contato } from 'src/app/classes/contato.class';
import { Pais } from 'src/app/classes/pais.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ContatoService } from 'src/app/services/contato.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { pipe } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

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
  public codigoPais: string = '+55';

  public showForm: boolean = true;

  contatoForm: FormGroup;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _service: ContatoService,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._valid = this._validService.getValid();

    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null, Validators.maxLength(10)],
      telefoneRecado: [null, Validators.maxLength(10)],
      celularPrincipal: [null, [Validators.required, Validators.maxLength(11)]],
      celularSecundario: [null, Validators.maxLength(11)],
    });
  }

  ngOnInit(): void {
    if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
      this._router.navigateByUrl('/');
    }

    if (this._cadastro.endereco?.pais && !this._cadastro.contato?.celularPrincipal) {
      this._dominioService.getPaises().pipe(
        map((response) => {
          this._loading.emitChange(true);
          let paises: Pais[] = response.body;
          const pais = paises.find(pais => pais.id == Number(this._cadastro.endereco?.pais));
          this.codigoPais = '+' + Number(pais.codigo);
        })
      ).subscribe(null, null,
        () => {
          setTimeout(() => {
            this._loading.emitChange(false);
          });
      });
    } else {
      this._service.getDados(this._valid.id).pipe(
        map(response => {
          this._cadastro.contato = response;
          this._loading.emitChange(true);
        })
      ).subscribe(null, null,
        () => {
          this.popularForm();
          setTimeout(() => {
            this._loading.emitChange(false);
          });
        });
    }
    this.showForm = false;
  }

  popularForm() {
    this.codigoPais = '+' + String(this._cadastro.contato?.celularPrincipal).substring(0, 2);
    this.contatoForm.patchValue({
      telefoneFixo: String(this._cadastro.contato?.telefoneFixo).substring(2),
      telefoneRecado: String(this._cadastro.contato?.telefoneRecado).substring(2),
      celularPrincipal: String(this._cadastro.contato?.celularPrincipal).substring(2),
      celularSecundario: String(this._cadastro.contato?.celularSecundario).substring(2)
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this._contato = this.contatoForm.value;
    this._contato.celularPrincipal = Number(this.codigoPais.replace('+', '') + this._contato.celularPrincipal);
    this._contato.celularSecundario = Number(this.codigoPais.replace('+', '') + this._contato.celularSecundario);
    this._contato.telefoneFixo = Number(this.codigoPais.replace('+', '') + this._contato.telefoneFixo);
    this._contato.telefoneRecado = Number(this.codigoPais.replace('+', '') + this._contato.telefoneRecado);
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
