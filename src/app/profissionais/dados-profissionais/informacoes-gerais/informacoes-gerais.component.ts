import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { EstadoCivil } from 'src/app/classes/estado-civil.class';
import { Genero } from 'src/app/classes/genero.class';
import { Profissional } from 'src/app/classes/profissional.class';
import { TipoEmpresa } from 'src/app/classes/tipo-empresa.class';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
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

  public generos: Array<Genero>;
  public tipoEmpresas: Array<TipoEmpresa>;
  public estadoCivis: Array<EstadoCivil>;
  public fotoProfissional: string | ArrayBuffer = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fotoRg: string | ArrayBuffer = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public validationHas: InputValidationHas = new InputValidationHas();
  public fileInputProfissional: string = 'fileinput-new';
  public fileInputRg: string = 'fileinput-new';
  public profissional: Profissional;

  private _fileProfissional: File;
  private _fileRg: File;
  private _dadosLocalStorage: Valid;
  private _dataAtual: Date;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: ProfissionalService,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._dadosLocalStorage = this._validService.getValid();
    this._loading.emitChange(true);

    this.profissionalForm = this._formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [null, Validators.minLength(10)],
      rg: [null],
      rgEmissor: [null],
      rgDataEmissao: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      pis: [null],
      genero: [null, Validators.required],
      tipoEmpresa: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      cnpj: [null, [Validators.required, validCnpj()]],
      ctps: [null, Validators.required],
      ctpsSerie: [null, Validators.required],
      fotoProfissional: [null, Validators.required],
      fotoRg: [null, Validators.required],
    });
  }

  ngOnInit() {
    this._dataAtual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this._dominioService.getGeneros().pipe(
      map(response => this.generos = response.body),
      concatMap(() => this._dominioService.getTipoEmpresas().pipe(map(response => this.tipoEmpresas = response.body))),
      concatMap(() => this._dominioService.getEstadoCivis().pipe(map(response => this.estadoCivis = response.body))),
      concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    ).subscribe(dadosProfissional => {
      this.profissional = dadosProfissional;
      this.popularForm();
      if (this.profissional && this.profissional.fotoProfissional) {
        this.fotoProfissional = this.profissional.fotoProfissional;
        this.fileInputProfissional = 'fileinput-exists';
      }
      if (this.profissional && this.profissional.fotoRg) {
        this.fotoRg = this.profissional.fotoRg;
        this.fileInputRg = 'fileinput-exists';
      }
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this._loading.emitChange(false);
      });
    });
    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });
  }

  popularForm() {
    if (this.profissional) {
      this.profissionalForm.patchValue({
        nome: this.profissional.nome,
        sobrenome: this.profissional.sobrenome,
        dataNascimento: this.profissional.dataNascimento,
        rg: this.profissional.rg,
        rgEmissor: this.profissional.rgEmissor,
        rgDataEmissao: this.profissional.rgDataEmissao ? this.profissional.rgDataEmissao : this._dataAtual,
        pis: this.profissional.pis,
        genero: this.profissional.genero,
        tipoEmpresa: this.profissional.tipoEmpresa,
        estadoCivil: this.profissional.estadoCivil,
        cnpj: this.profissional.cnpj,
        ctps: this.profissional.ctps,
        ctpsSerie: this.profissional.ctpsSerie
      });
      this.profissionalForm.controls.fotoRg.setValue(this.profissional.fotoRg, {emitModelToViewChange: false});
      this.profissionalForm.controls.fotoProfissional.setValue(this.profissional.fotoProfissional, {emitModelToViewChange: false});
    }
  }

  onLoadFotoProfissional(event: any) {
    this._fileProfissional = event.target.files[0];
    var reader = new FileReader();
    if (this._fileProfissional) {
      reader.readAsDataURL(this._fileProfissional);
      this.fileInputProfissional = 'fileinput-exists';
    }
    reader.onload = () => {
      this.fotoProfissional = reader.result;
    };
  }

  onLoadFotoRg(event: any) {
    this._fileRg = event.target.files[0];
    console.log(this._fileRg);
    var reader = new FileReader();
    if (this._fileRg) {
      reader.readAsDataURL(this._fileRg);
      this.fileInputRg = 'fileinput-exists';
    }
    reader.onload = () => {
      this.fotoRg = reader.result;
    };
  }

  onSubmit() {
    console.log(this.profissional);
    console.log('Form:');
    console.log(this.profissionalForm.value);
    this._loading.emitChange(true);
    let profissional: Profissional = this.profissionalForm.value;
    profissional.id = this._dadosLocalStorage.id;

    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRg = this.fotoRg;

    this._service.save(profissional).subscribe(response => {
      this._dadosLocalStorage.id = response.body.profissionalId;
      setTimeout(() => {
        this._cadastro.profissional = profissional;
        this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/endereco`);
        this._loading.emitChange(false);
      });
    }, () => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir profissional',
        showConfirmButton: true
      });
    });
  }

  dateChange(control: FormControl, name: string) {
    console.log(name);
    jQuery(`#${name}`).on('dp.change', function(event: any) {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

  lpadZero(control: AbstractControl) {
    let valor = String(Number(control.value)).padStart(9, '0');
    this.profissionalForm.controls.rg.setValue(valor);
  }

  limpar() {
    this.profissionalForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery('.selectpicker').selectpicker('refresh');
  }

}
