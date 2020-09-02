import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AreaAtendimento} from 'src/app/classes/area-atendimento.class';
import {Carreira} from 'src/app/classes/carreira.class';
import {Conselho} from 'src/app/classes/conselho.class';
import {Estado} from 'src/app/classes/estado.class';
import {Transporte} from 'src/app/classes/transporte.class';
import {Role} from 'src/app/enums/role.enum';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {CarreiraService} from 'src/app/services/carreira.service';
import {DominioService} from 'src/app/services/dominio.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {ValidService} from '../../../shared/services/shared-valid.service';
import {concatMap, map} from 'rxjs/operators';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-carreira',
  templateUrl: './carreira.component.html',
  styleUrls: ['./carreira.component.css']
})
export class CarreiraComponent implements OnInit {

  carreiraForm: FormGroup;

  @Output() loadingEvent = new EventEmitter<boolean>();
  private _dadosLocalStorage: Valid;

  public conselhos: Array<Conselho>;
  public estados: Array<Estado>;
  public areasAtendimento: Array<AreaAtendimento>;
  public transportes: Array<Transporte>;
  public validationHas: InputValidationHas;
  public carreira: Carreira;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: CarreiraService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService,
  ) {
    this._sharedLoadingService.emitChange(true);
    this.carreiraForm = this._formBuilder.group({
      conselho: ['', Validators.required],
      registroProfissional: [this._cadastro.carreira?.registroProfissional, Validators.maxLength(15)],
      ufConselho: ['', Validators.required],
      areasAtendimento: ['', Validators.required],
      nomeReferencia1: [this._cadastro.carreira?.nomeReferencia1, Validators.maxLength(100)],
      telefoneReferencia1: [this._cadastro.carreira?.telefoneReferencia1, Validators.maxLength(11)],
      nomeReferencia2: [this._cadastro.carreira?.nomeReferencia2, Validators.maxLength(100)],
      telefoneReferencia2: [this._cadastro.carreira?.telefoneReferencia2, Validators.maxLength(11)],
      transporte: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this._dadosLocalStorage = this._validService.getValid();
    this.validationHas = new InputValidationHas();

    if (this?._dadosLocalStorage?.role != Role.Profissional || !this?._dadosLocalStorage?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getConselhos().pipe(
      map(conselhos => this.conselhos = conselhos.body),
      concatMap(() => this._dominioService.getEstados().pipe(map(estados => this.estados = estados.body))),
      concatMap(() => this._dominioService.getAreasAtendimento().pipe(map(areasAtentimento => this.areasAtendimento = areasAtentimento.body))),
      concatMap(() => this._dominioService.getTransportes().pipe(map(transportes => this.transportes = transportes.body))),
      concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    ).subscribe(dadosCarreira => {
      this.carreira = dadosCarreira;
      this.popularForm();
      if (this.carreira && this.carreira.areasAtendimento) {
        this.carregarAreasAtendimento();
      }
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this._sharedLoadingService.emitChange(false);
      });
    });
  }

  popularForm(): void {
    if (this.carreira) {
      this.carreiraForm.patchValue({
        conselho: this.carreira.conselho,
        registroProfissional: this.carreira.registroProfissional,
        ufConselho: this.carreira.ufConselho,
        nomeReferencia1: this.carreira.nomeReferencia1,
        telefoneReferencia1: this.carreira.telefoneReferencia1,
        nomeReferencia2: this.carreira.nomeReferencia2,
        telefoneReferencia2: this.carreira.telefoneReferencia2,
        transporte: this.carreira.transporte,
      });
    }
  }

  carregarAreasAtendimento(): void {
    let areasAtendimento: Array<string> = new Array<string>();
    for (const areaAtendimentoKey of this.carreira.areasAtendimento) {
      areasAtendimento.push(areaAtendimentoKey.nome.toUpperCase());
    }
    this.carreiraForm.patchValue({
      areasAtendimento: areasAtendimento
    });
    jQuery('select[id=\'areasAtendimento\']').val(areasAtendimento);
  }

  lerAreasAtendimento(): Array<AreaAtendimento> {
    let areasAtendimento: Array<AreaAtendimento> = new Array<AreaAtendimento>();
    let variavelTipoString: boolean = (typeof this.carreiraForm.controls.areasAtendimento.value === 'string');

    if (variavelTipoString) {
      for (let i = 0; i < this.areasAtendimento.length; i++) {
        if (this.carreiraForm.controls.areasAtendimento.value === this.areasAtendimento[i].nome.toUpperCase()) {
          areasAtendimento.push(this.areasAtendimento[i]);
        }
      }
    } else {
      let areasAtendimentoCarreiraForm: Array<string> = this.carreiraForm.controls.areasAtendimento.value;

      for (let i = 0; i < this.areasAtendimento.length; i++) {
        for (let j = 0; j < areasAtendimentoCarreiraForm.length; j++) {
          if (areasAtendimentoCarreiraForm[j] === this.areasAtendimento[i].nome.toUpperCase()) {
            areasAtendimento.push(this.areasAtendimento[i]);
          }
        }
      }
    }
    return areasAtendimento;
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);

    this.carreira = this.carreiraForm.value;
    this.carreira.areasAtendimento = this.lerAreasAtendimento();
    this.carreira.registroProfissional = Number(this.carreiraForm.value.registroProfissional);
    this.carreira.proprietarioId = this._dadosLocalStorage.id;


    console.log(this.carreira);
    this._service.save(this.carreira).subscribe(response => {
      setTimeout(() => {
        this._cadastro.carreira = this.carreira;
        this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}`);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this._sharedLoadingService.emitChange(false);
      });
    }, () => {
      this._sharedLoadingService.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar altearar os dados de carreira',
        showConfirmButton: true
      });
    });
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/contato`);
  }

  limpar() {
    this.carreiraForm.reset();
    jQuery('.selectpicker').selectpicker('refresh');
  }

}
