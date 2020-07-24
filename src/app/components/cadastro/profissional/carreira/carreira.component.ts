import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
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
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { ValidService } from 'src/app/shared/services/shared-valid.service';

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

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: CarreiraService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getConselhos().subscribe(response => {
      this.conselhos = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='conselho']").selectpicker('refresh');
      })
    });

    this._dominioService.getEstados().subscribe(response => {
      this.estados = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='ufConselho']").selectpicker('refresh');
      })
    });

    this._dominioService.getAreasAtendimento().subscribe(response => {
      this.areasAtendimento = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='areaAtendimento']").selectpicker('refresh');
      })
    });

    this._dominioService.getTransportes().subscribe(response => {
      this.transportes = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='transporte']").selectpicker('refresh');
      })
    });

    this.carreiraForm = this._formBuilder.group({
      conselho: ['', [Validators.required]],
      registroProfissional: [this._cadastro.carreira?.registroProfissional, [Validators.maxLength(15)]],
      ufConselho: ['', [Validators.required]],
      areaAtendimento: ['', [Validators.required]],
      nomeReferencia1: [this._cadastro.carreira?.nomeReferencia1, [Validators.maxLength(100)]],
      telefoneReferencia1: [this._cadastro.carreira?.telefoneReferencia1, [Validators.maxLength(11)]],
      nomeReferencia2: [this._cadastro.carreira?.nomeReferencia2, [Validators.maxLength(100)]],
      telefoneReferencia2: [this._cadastro.carreira?.telefoneReferencia2, [Validators.maxLength(11)]],
      transporte: ['', [Validators.required]],
    });

  }

  onSubmit() {
    this._loading.emitChange(true);
    this.carreira = this.carreiraForm.value;

    this.carreira.proprietarioId = this.valid.id;

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
