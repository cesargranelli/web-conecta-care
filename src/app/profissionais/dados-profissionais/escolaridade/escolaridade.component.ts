import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Escolaridade} from 'src/app/classes/escolaridade.class';
import {Instrucao} from 'src/app/classes/instrucao.class';
import {DominioService} from 'src/app/services/dominio.service';
import {EscolaridadeService} from 'src/app/services/escolaridade.service';
import {Valid} from 'src/app/services/feat/Valid';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ValidService} from '../../../shared/services/shared-valid.service';
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';
import {concatMap, map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.css']
})
export class EscolaridadeComponent implements OnInit, OnDestroy {
  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;
  private _serviceSubscription: Subscription;
  private _dominioSubscription: Subscription;
  private _flatSubscription: Subscription;

  public instrucoes: Array<Instrucao>;
  public validationHas: InputValidationHas;
  public escolaridadeForm: FormGroup;
  public escolaridade: Escolaridade;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _validService: ValidService,
    private _service: EscolaridadeService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.escolaridadeForm = this._formBuilder.group({
      instrucao: [null, Validators.required],
      instituicaoEnsino1: [null, Validators.maxLength(50)],
      anoConclusao1: [null, Validators.maxLength(4)],
      instituicaoEnsino2: [null, Validators.maxLength(50)],
      anoConclusao2: [null, Validators.maxLength(4)],
      instituicaoEnsino3: [null, Validators.maxLength(50)],
      anoConclusao3: [null, Validators.maxLength(4)],
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this.escolaridade = new Escolaridade();
    this._dadosLocalStorage = this._validService.getValid();

    this._dominioService.getInstrucoes().pipe(
      map(instrucoes => {
        this.instrucoes = instrucoes.body;
      }),
      concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    ).subscribe(escolaridade => {
      this.escolaridade = escolaridade;
      this.popularForm();
      setTimeout(() => {
        jQuery('select[id=\'instrucao\']').selectpicker('refresh');
      });
    });

  }

  popularForm() {
    this.escolaridadeForm.patchValue({
      instrucao: this.escolaridade.instrucao,
      instituicaoEnsino1: this.escolaridade.instituicaoEnsino[0],
      anoConclusao1: this.escolaridade.anoConclusao[0],
      instituicaoEnsino2: this.escolaridade.instituicaoEnsino[1],
      anoConclusao2: this.escolaridade.anoConclusao[1],
      instituicaoEnsino3: this.escolaridade.instituicaoEnsino[2],
      anoConclusao3: this.escolaridade.anoConclusao[2]
    });
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);

    this.escolaridade.instrucao = this.escolaridadeForm.value.instrucao;
    this.escolaridade.instituicaoEnsino[0] = this.escolaridadeForm.value.instituicaoEnsino1;
    this.escolaridade.instituicaoEnsino[1] = this.escolaridadeForm.value.instituicaoEnsino2;
    this.escolaridade.instituicaoEnsino[2] = this.escolaridadeForm.value.instituicaoEnsino3;
    this.escolaridade.anoConclusao[0] = this.escolaridadeForm.value.anoConclusao1;
    this.escolaridade.anoConclusao[1] = this.escolaridadeForm.value.anoConclusao2;
    this.escolaridade.anoConclusao[2] = this.escolaridadeForm.value.anoConclusao3;
    this.escolaridade.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this.escolaridade).subscribe({
      next: () => {
        setTimeout(() => {
          this._cadastro.escolaridade = this.escolaridade;
          this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/complemento`, {
            state: {valid: this._dadosLocalStorage}
          });
          this._sharedLoadingService.emitChange(false);
        });
      },
      error: () => {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir escolaridade',
          showConfirmButton: true
        });
      }
    });
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/experiencia`, {
      state: {valid: this._dadosLocalStorage}
    });
  }

  ngOnDestroy() {
    this._serviceSubscription.unsubscribe();
    this._dominioSubscription.unsubscribe();
  }

}
