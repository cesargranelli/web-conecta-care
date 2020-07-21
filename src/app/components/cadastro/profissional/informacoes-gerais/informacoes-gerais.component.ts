import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
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
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
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
  public imagemFotoProfissional: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public imagemFotoRg: string = '../../../../../assets/img/Headshot-Placeholder-1.png';

  teste: boolean = false;
  generoId: number;
  tipoEmpresaId: number;
  estadoCivilId: number;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _service: ProfissionalService,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this.valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {
    this._loading.emitChange(true);

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getGeneros().subscribe(response => {
      this.generos = response.body;
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='genero']").selectpicker("refresh");
      })
    });

    this._dominioService.getTipoEmpresas().subscribe(response => {
      this.tipoEmpresas = response.body;
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='tipoEmpresa']").selectpicker('refresh');
      })
    });

    this._dominioService.getEstadoCivis().subscribe(response => {
      this.estadoCivis = response.body;
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='estadoCivil']").selectpicker('refresh');
      })
    });

    this.profissionalForm = this._formBuilder.group({
      nome: [this._cadastro.profissional?.nome, [Validators.required]],
      sobrenome: [this._cadastro.profissional?.sobrenome, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [this._cadastro.profissional?.dataNascimento, [Validators.required]],
      rg: [this._cadastro.profissional?.rg],
      rgEmissor: [this._cadastro.profissional?.rgEmissor],
      rgDataEmissao: [this._cadastro.profissional?.rgDataEmissao],
      pis: [this._cadastro.profissional?.pis],
      genero: ['', [Validators.required]],
      tipoEmpresa: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      cnpj: [this._cadastro.profissional?.cnpj, [Validators.required, validCnpj()]],
      ctps: [this._cadastro.profissional?.ctps, [Validators.required]],
      ctpsSerie: [this._cadastro.profissional?.ctpsSerie, [Validators.required]],
      fotoProfissional: ['', [Validators.required]],
      fotoRg: ['', [Validators.required]],
    });

    this._loading.emitChange(false);

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

  onLoadFotoRg(event:any) {
    this._fileRg = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this._fileRg);
    reader.onload = () => {
      this.fotoRg = reader.result;
    };
  }

  onSubmit() {
    let profissional: Profissional = this.profissionalForm.value;
    profissional.id = 29;//Number(String(this.valid.id));

    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRg = this.fotoRg;

    this._service.save(profissional).subscribe(response => {
      this._loading.emitChange(true);
      this.valid.id = response.body.profissionalId;
      setTimeout(() => {
        this._cadastro.profissional = profissional;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/endereco`, {
          state: { valid: this.valid }
        });
        this._loading.emitChange(false);
      });
    },
    (error: Error) => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir profissional',
        showConfirmButton: true
      });
    });
  }

  lpadZero(control: AbstractControl) {
    let valor = String(Number(control.value)).padStart(9, '0');
    this.profissionalForm.controls.rg.setValue(valor);
  }

  limpar() {
    this.profissionalForm.reset();
    jQuery('.fileinput').fileinput('clear');
  }

}
