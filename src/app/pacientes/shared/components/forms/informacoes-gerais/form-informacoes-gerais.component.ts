import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoCivil } from 'src/app/classes/estado-civil.class';
import { Genero } from 'src/app/classes/genero.class';
import { Profissional } from 'src/app/classes/profissional.class';
import { TipoEmpresa } from 'src/app/classes/tipo-empresa.class';
import { PacienteService } from 'src/app/pacientes/services/paciente.service';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { Valid } from 'src/app/services/feat/Valid';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {validCnpj} from '../../../../../shared/validations/directives/valid-cnpj.directive';

declare var jQuery: any;

@Component({
  selector: 'app-form-informacoes-gerais',
  templateUrl: './form-informacoes-gerais.component.html',
  styleUrls: ['./form-informacoes-gerais.component.css']
})
export class FormInformacoesGeraisComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public pacienteForm: FormGroup;
  public generos: Array<Genero>;
  public tipoEmpresas: Array<TipoEmpresa>;
  public estadoCivis: Array<EstadoCivil>;
  public validationHas: InputValidationHas = new InputValidationHas();
  public fileInputProfissional: string = 'fileinput-new';
  public fileInputRg: string = 'fileinput-new';
  public hideForm: boolean = true;
  public profissional: Profissional;
  private readonly CAMINHO_IMAGEM_DUMMY: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fotoProfissional: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public fotoRg: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  private _fileProfissional: File;
  private _fileRg: File;
  private _dadosLocalStorage: Valid;
  private _dataAtual: Date;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: ProfissionalService,
    private _dominioService: PacienteService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._dadosLocalStorage = this._validService.getValid();
    // this._loading.emitChange(true);
    this.hideForm = false;

    this.pacienteForm = this._formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, [Validators.required, Validators.maxLength(60)]],
      cpf: [null, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [null, Validators.minLength(10)],
      rg: [null],
      rgEmissor: [null],
      rgDataEmissao: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      pis: [null],
      genero: [null, Validators.required],
      tipoEmpresa: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      cnpj: [null, [validCnpj(false)]],
      ctps: [null, Validators.required],
      ctpsSerie: [null, Validators.required],
      fotoProfissional: [null, Validators.required],
      fotoRg: [null, Validators.required],
    });
  }

  ngOnInit() {
    this._dataAtual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    // this._dominioService.listarGenero().pipe(
    //   map(response => this.generos = response.body),
    //   concatMap(() => this._dominioService.listarEstadoCivil().pipe(map(response => this.estadoCivis = response.body))),
      //concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    // ).subscribe(dadosProfissional => {
      // this.profissional = dadosProfissional;
      // this.popularForm();
      // if (this.profissional && this.profissional.fotoProfissional) {
      //   this.fotoProfissional = this.profissional.fotoProfissional;
      //   this.fileInputProfissional = 'fileinput-exists';
      // }
      // if (this.profissional && this.profissional.fotoRg) {
      //   this.fotoRg = this.profissional.fotoRg;
      //   this.fileInputRg = 'fileinput-exists';
      // }
      // jQuery('select').selectpicker('render');
      // setTimeout(() => {
      //   jQuery('select').selectpicker('refresh');
      //   this.showForm = false;
      //   this._loading.emitChange(false);
      // });
    // });
    // jQuery('.datetimepicker').datetimepicker({
    //   format: 'DD/MM/YYYY',
    //   maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    // });
  }

  popularForm() {
    if (this.profissional) {
      this.pacienteForm.patchValue({
        nome: this.profissional.nome,
        sobrenome: this.profissional.sobrenome,
        dataNascimento: this.profissional.dataNascimento,
        rg: this.profissional.rg,
        rgEmissor: this.profissional.rgEmissor,
        rgDataEmissao: this.profissional.rgDataEmissao,
        pis: this.profissional.pis,
        genero: this.profissional.genero.id,
        tipoEmpresa: this.profissional.tipoEmpresa.id,
        estadoCivil: this.profissional.estadoCivil.id,
        cnpj: this.profissional.cnpj == 0 ? null : this.profissional.cnpj,
        ctps: this.profissional.ctps,
        ctpsSerie: this.profissional.ctpsSerie
      });
      this.pacienteForm.controls.fotoRg.setValue(this.profissional.fotoRg, {emitModelToViewChange: false});
      this.pacienteForm.controls.fotoProfissional.setValue(this.profissional.fotoProfissional, {emitModelToViewChange: false});
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
    this._loading.emitChange(true);
    let profissional = this.pacienteForm.value;

    profissional.id = this._dadosLocalStorage.id;
    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRg = this.fotoRg;

    if (this.validacoes(profissional.rgDataEmissao, profissional.dataNascimento) && profissional.rg != null) {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'A data de emissão do RG deve ser maior do que a data de nascimento',
        showConfirmButton: true,
      });
      return;
    }

    if (this.validaIdade(profissional.dataNascimento)) {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Necessário ter 18 anos ou mais para se cadastrar.',
        showConfirmButton: true,
      });
      return;
    }

    if (profissional.rg != null && profissional.rg != '') {
      if (profissional.rgDataEmissao == null || profissional.rgDataEmissao == '') {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Data de emissão do RG obrigatória.',
          showConfirmButton: true,
        });
        return;
      }
      if (profissional.rgEmissor == null || profissional.rgEmissor == '') {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Emissor do RG obrigatório.',
          showConfirmButton: true,
        });
        return;
      }
    }

    this._service.save(profissional).subscribe(response => {
      this._dadosLocalStorage.id = response.body.profissionalId;
      setTimeout(() => {
        this._cadastro.profissional = profissional;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this._router.navigateByUrl(`profissionais/${this._dadosLocalStorage.id}/dados-profissionais`);
        this._loading.emitChange(false);
      });
    }, () => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar alterar as informações do profissional',
        showConfirmButton: true
      });
    });
  }

  validacoes(dataEmissao: string, dataNascimento: string) {
    if (new Date(dataEmissao) < new Date(dataNascimento)) {
      return true;
    }
  }

  validaIdade(dataNascimento: any) {
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let anoNascParts = dataNascimento.split('/');
    let diaNasc = anoNascParts[0];
    let mesNasc = anoNascParts[1];
    let anoNasc = anoNascParts[2];
    let idade = anoAtual - anoNasc;
    let mesAtual = dataAtual.getMonth() + 1;

    if (mesAtual < mesNasc) {
      idade--;
    } else if (mesAtual == mesNasc && new Date().getDate() < diaNasc) {
      idade--;
    }
    if (idade < 18) {
      return true;
    }
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function(event: any) {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

}
