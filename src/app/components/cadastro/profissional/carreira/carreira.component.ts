import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { concatMap } from 'rxjs/operators';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { Carreira } from 'src/app/classes/carreira.class';
import { Conselho } from 'src/app/classes/conselho.class';
import { Estado } from 'src/app/classes/estado.class';
import { Transporte } from 'src/app/classes/transporte.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { CarreiraService } from 'src/app/services/carreira.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
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
  private valid: Valid;
  private carreira: Carreira;

  public conselhos: Conselho[];
  public estados: Estado[];
  public areasAtendimento: AreaAtendimento[];
  public transportes: Transporte[];
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;
  public labelRegistro: string = 'Selecione ao lado';

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: CarreiraService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.carreiraForm = this._formBuilder.group({
      conselho: [null, [Validators.required]],
      registroProfissional: [null, [Validators.maxLength(15)]],
      ufConselho: [null, [Validators.required]],
      areaAtendimento: [null, [Validators.required]],
      nomeReferencia1: [null, [Validators.maxLength(100)]],
      telefoneReferencia1: [null, [Validators.maxLength(11)]],
      nomeReferencia2: [null, [Validators.maxLength(100)]],
      telefoneReferencia2: [null, [Validators.maxLength(11)]],
      transporte: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getConselhos().pipe(
      map(response => {
        this._loading.emitChange(true);
        this.conselhos = response.body;
      }),
      concatMap(() => this._dominioService.getEstados().pipe(map(response => this.estados = response.body))),
      concatMap(() => this._dominioService.getAreasAtendimento().pipe(map(response => this.areasAtendimento = response.body))),
      concatMap(() => this._dominioService.getTransportes().pipe(map(response => this.transportes = response.body)))
    ).subscribe(null, null, () => {
      this.populaForm();
      this.carregarAreasAtendimento();
        setTimeout(() => {
          jQuery("select[id='conselho']").selectpicker('refresh');
          jQuery(`select[id='conselho']`).selectpicker('val', this._cadastro.carreira?.conselho.id);
          jQuery("select[id='ufConselho']").selectpicker('refresh');
          jQuery(`select[id='ufConselho']`).selectpicker('val', this._cadastro.carreira?.ufConselho.id);
          jQuery("select[id='transporte']").selectpicker('refresh');
          jQuery(`select[id='transporte']`).selectpicker('val', this._cadastro.carreira?.transporte.id);
          jQuery(`select[id='areaAtendimento']`).selectpicker('refresh');
          this.carregarAreasAtendimento();
          this._loading.emitChange(false);
        });
      this.showForm = false;
    });
    this._loading.emitChange(false);
  }

  populaForm() {
    this.carreiraForm.patchValue({
      registroProfissional: this._cadastro.carreira?.registroProfissional,
      nomeReferencia1: this._cadastro.carreira?.nomeReferencia1,
      telefoneReferencia1: this._cadastro.carreira?.telefoneReferencia1,
      nomeReferencia2: this._cadastro.carreira?.nomeReferencia2,
      telefoneReferencia2: this._cadastro.carreira?.telefoneReferencia2
    });
  }

  carregarAreasAtendimento(): void {
    if (this._cadastro.carreira?.areasAtendimento) {
      let nomesAreaAtendimento: Array<string> = new Array<string>();
      for (const areaAtendimentoKey of this._cadastro.carreira?.areasAtendimento) {
        nomesAreaAtendimento.push(areaAtendimentoKey.nome.toUpperCase());
      }
      this.carreiraForm.patchValue({
        areaAtendimento: nomesAreaAtendimento
      });
      jQuery(`select[id='areaAtendimento']`).val(nomesAreaAtendimento);
      jQuery(`select[id='areaAtendimento']`).selectpicker('render');
    }
  }

  labelRegistroSelecao() {
    let conselho = this.conselhos.filter(conselho => conselho.id == this.carreiraForm.controls.conselho.value);
    this.labelRegistro = 'Nº Registro em '.concat(conselho[0].descricao.toString());
  }

  onSubmit() {
    this._loading.emitChange(true);
    this.carreira = this.carreiraForm.value;

    let areasAtendimento: Array<AreaAtendimento> = new Array<AreaAtendimento>();
    this.carreiraForm.controls.areaAtendimento.value.forEach((area: any) => {
      areasAtendimento.push(this.areasAtendimento.filter(areaAtendimento => areaAtendimento.nome.toUpperCase() == area)[0]);
    });

    this.carreira.areasAtendimento = areasAtendimento;

    this.carreira.proprietarioId = this.valid.id;

    // Incluído para corrigir os tipos Begin
    this.carreira.registroProfissional = Number(this.carreira.registroProfissional);
    this.carreira.conselho = this.conselhos.filter(conselho => conselho.id == Number(this.carreira.conselho))[0];
    this.carreira.ufConselho = this.estados.filter(estado => estado.id == Number(this.carreira.ufConselho))[0];
    this.carreira.transporte = this.transportes.filter(transporte => transporte.id == Number(this.carreira.transporte))[0];
    // Incluído para corrigir os tipos End

    this._service.save(this.carreira).subscribe(response => {
      setTimeout(() => {
        this._cadastro.carreira = this.carreira;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/experiencia`);
        this._loading.emitChange(false);
      });
    },
    (error: Error) => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir carreira',
        showConfirmButton: true
      });
    });
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/contato`);
  }

  limpar() {
    this.carreiraForm.reset();
    jQuery(".selectpicker").selectpicker('refresh');
  }

}
