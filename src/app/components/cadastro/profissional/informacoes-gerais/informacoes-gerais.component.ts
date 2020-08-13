import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,


  FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { EstadoCivil } from 'src/app/classes/estado-civil.class';
import { Genero } from 'src/app/classes/genero.class';
import { Profissional } from 'src/app/classes/profissional.class';
import { TipoEmpresa } from 'src/app/classes/tipo-empresa.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css'],
})
export class InformacoesGeraisComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public profissionalForm: FormGroup;

  public generos: Genero[];
  public tipoEmpresas: TipoEmpresa[];
  public estadoCivis: EstadoCivil[];

  public fotoProfissional: any;
  public fotoRg: any;
  public valid: Valid;
  public validationHas: InputValidationHas = new InputValidationHas();

  private _fileProfissional: File;
  private _fileRg: File;

  public fileInputProfissional: string = 'fileinput-new';
  public fileInputRg: string = 'fileinput-new';
  public imagemFotoProfissional: string =
    '../../../../../assets/img/Headshot-Placeholder-1.png';
  public imagemFotoRg: string =
    '../../../../../assets/img/Headshot-Placeholder-1.png';

  teste: boolean = false;
  generoId: number;
  tipoEmpresaId: number;
  estadoCivilId: number;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _service: ProfissionalService,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.profissionalForm = this._formBuilder.group({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [null, [Validators.required]],
      rg: [null],
      rgEmissor: [null],
      rgDataEmissao: [null],
      pis: [null],
      genero: [null, [Validators.required]],
      tipoEmpresa: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      cnpj: [null, [Validators.required, validCnpj()]],
      ctps: [null, [Validators.required]],
      ctpsSerie: [null, [Validators.required]],
      fotoProfissional: [null, [Validators.required]],
      fotoRg: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      // this._router.navigateByUrl('/');
    }

    this._dominioService.getGeneros().pipe(
      map((response) => {
        this._loading.emitChange(true);
        this.generos = response.body;
      }),
      concatMap(() => this._dominioService.getTipoEmpresas().pipe(
        map(response => {
          this.tipoEmpresas = response.body;
        }))
      ),
      concatMap(() => this._dominioService.getEstadoCivis().pipe(
        map(response => {
          this.estadoCivis = response.body;
        }))
      )
    ).subscribe(() => {
      this.popularForm();
      setTimeout(() => {
        jQuery(`select[id='genero']`).selectpicker('refresh');
        jQuery(`select[id='tipoEmpresa']`).selectpicker('refresh');
        jQuery("select[id='estadoCivil']").selectpicker('refresh');
        this._loading.emitChange(false);
      });
    }, () => {
      this._loading.emitChange(false);
    });

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });

    this._loading.emitChange(false);
  }

  popularForm() {
    this.profissionalForm.patchValue({
      nome: this._cadastro.profissional?.nome,
      sobrenome: this._cadastro.profissional?.sobrenome,
      dataNascimento: this._cadastro.profissional?.dataNascimento,
      rg: this._cadastro.profissional?.rg,
      rgEmissor: this._cadastro.profissional?.rgEmissor,
      rgDataEmissao: this._cadastro.profissional?.rgDataEmissao,
      pis: this._cadastro.profissional?.pis,
      // genero: ['', [Validators.required]],
      // tipoEmpresa: ['', [Validators.required]],
      // estadoCivil: ['', [Validators.required]],
      cnpj: this._cadastro.profissional?.cnpj,
      ctps: this._cadastro.profissional?.ctps,
      ctpsSerie: this._cadastro.profissional?.ctpsSerie,
      // fotoProfissional: ['', [Validators.required]],
      // fotoRg:
    });

    if (this._cadastro.profissional?.fotoProfissional) {
      this.imagemFotoProfissional = this._cadastro.profissional?.fotoProfissional;
      this.fileInputProfissional = 'fileinput-exists';
    }
    if (this._cadastro.profissional?.fotoRg) {
      this.imagemFotoRg = this._cadastro.profissional?.fotoRg;
      this.fileInputRg = 'fileinput-exists';
    }

    this.generoId = this._cadastro.profissional?.genero.id;
    this.tipoEmpresaId = this._cadastro.profissional?.tipoEmpresa.id;
    this.estadoCivilId = this._cadastro.profissional?.estadoCivil.id;
  }

  onLoadFotoProfissional(event: any) {
    this._fileProfissional = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this._fileProfissional);
    reader.onload = () => {
      this.fotoProfissional = reader.result;
    };
  }

  onLoadFotoRg(event: any) {
    this._fileRg = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this._fileRg);
    reader.onload = () => {
      this.fotoRg = reader.result;
    };
  }

  onSubmit() {
    if (this.validacoes()) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'A data de emissão do RG deve ser maior do que a data de nascimento',
        showConfirmButton: true,
      });
      return;
    }

    this._loading.emitChange(true);
    let profissional: Profissional = this.profissionalForm.value;
    profissional.id = this.valid.id;

    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRg = this.fotoRg;

    this._service.save(profissional).subscribe(
      (response) => {
        this.valid.id = response.body.profissionalId;
        setTimeout(() => {
          this._cadastro.profissional = profissional;
          this._router.navigateByUrl(
            `cadastro/profissionais/${this.valid.id}/endereco`
          );
          this._loading.emitChange(false);
        });
      },
      (error: Error) => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir profissional',
          showConfirmButton: true,
        });
      }
    );
  }

  lpadZero(control: FormControl) {
    let valor = control.value.padStart(9, '0');
    this.profissionalForm.controls.rg.setValue(valor.toUpperCase());
  }

  limpar() {
    this.profissionalForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery('.selectpicker').selectpicker('refresh');
  }

  validacoes() {
    if (this.profissionalForm.controls.rgDataEmissao < this.profissionalForm.controls.dataNascimento) {
      return true;
    }
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on("dp.change", function (event: any) {
      control.setValue(event?.date?._d.toLocaleDateString());
    });
  }

}
