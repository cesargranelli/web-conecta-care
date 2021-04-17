import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  templateUrl: './dados-informacoes-gerais.component.html',
  styleUrls: ['./dados-informacoes-gerais.component.css']
})
export class DadosInformacoesGeraisComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public profissionalForm: FormGroup;
  public generos: Array<Genero>;
  public tipoEmpresas: Array<TipoEmpresa>;
  public estadoCivis: Array<EstadoCivil>;
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;
  public profissional: Profissional;
  
  public fotoCtps: any;
  public imagemFotoCtps: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputCtps: string = 'fileinput-new';
  public fileCtps: File;

  public fotoProfissional: any;
  public imagemFotoProfissional: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fileInputProfissional: string = 'fileinput-new';
  public fileProfissional: File;
  
  public fotoRgFrente: any;
  public imagemFotoRgFrente: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputRgFrente: string = 'fileinput-new';
  public fileRgFrente: File;

  public fotoRgVerso: any;
  public imagemFotoRgVerso: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputRgVerso: string = 'fileinput-new';
  public fileRgVerso: File;

  public fotoAssinatura: any;
  public imagemFotoAssinatura: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputAssinatura: string = 'fileinput-new';
  public fileAssinatura: File;
  
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
      dataNascimento: [null],
      rg: [null],
      rgEmissor: [null],
      rgDataEmissao: [null],
      pis: [null],
      genero: [null, Validators.required],
      tipoEmpresa: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      cnpj: [null, [validCnpj(false)]],
      ctps: [null, Validators.required],
      ctpsSerie: [null, Validators.required],
      fotoCtps: [null, Validators.required],
      fotoProfissional: [null, Validators.required],
      fotoRgFrente: [null, Validators.required],
      fotoRgVerso: [null, Validators.required],
      fotoAssinatura: [null, Validators.required],
      disponivelParaAtendimento: [null, Validators.required],
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
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this.showForm = false;
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
        rgDataEmissao: this.profissional.rgDataEmissao,
        pis: this.profissional.pis,
        genero: this.profissional.genero.id,
        tipoEmpresa: this.profissional.tipoEmpresa.id,
        estadoCivil: this.profissional.estadoCivil.id,
        cnpj: this.profissional.cnpj == 0 ? null : this.profissional.cnpj,
        ctps: this.profissional.ctps,
        ctpsSerie: this.profissional.ctpsSerie
      });
      if (this.profissional && this.profissional.fotoCtps) {
        this.fotoCtps = this.profissional.fotoCtps;
        this.imagemFotoCtps = this.profissional.fotoCtps;
        this.profissionalForm.controls.fotoCtps.setValue(this.profissional.fotoCtps, {emitModelToViewChange: false});
      }
      if (this.profissional && this.profissional.fotoProfissional) {
        this.fotoProfissional = this.profissional.fotoProfissional;
        this.imagemFotoProfissional = this.profissional.fotoProfissional;
        this.profissionalForm.controls.fotoProfissional.setValue(this.profissional.fotoProfissional, {emitModelToViewChange: false});
      }
      if (this.profissional && this.profissional.fotoRgFrente) {
        this.fotoRgFrente = this.profissional.fotoRgFrente;
        this.imagemFotoRgFrente = this.profissional.fotoRgFrente;
        this.profissionalForm.controls.fotoRgFrente.setValue(this.profissional.fotoRgFrente, {emitModelToViewChange: false});
      }
      if (this.profissional && this.profissional.fotoRgVerso) {
        this.fotoRgVerso = this.profissional.fotoRgVerso;
        this.imagemFotoRgVerso = this.profissional.fotoRgVerso;
        this.profissionalForm.controls.fotoRgVerso.setValue(this.profissional.fotoRgVerso, {emitModelToViewChange: false});
      }
      if (this.profissional && this.profissional.fotoAssinatura) {
        this.fotoAssinatura = this.profissional.fotoAssinatura;
        this.imagemFotoAssinatura = this.profissional.fotoAssinatura;
        this.profissionalForm.controls.fotoAssinatura.setValue(this.profissional.fotoAssinatura, {emitModelToViewChange: false});
      }
      this.profissionalForm.controls.disponivelParaAtendimento.setValue(this.profissional.disponivelParaAtendimento);
    }
  }

  onLoadFotoCtps(event: any) {
    this.fileCtps = event.target.files[0];
    var reader = new FileReader();
    if (this.fileCtps) {
      reader.readAsDataURL(this.fileCtps);
    }
    reader.onload = () => {
      this.fotoCtps = reader.result;
    };
  }

  onLoadFotoProfissional(event: any) {
    this.fileProfissional = event.target.files[0];
    var reader = new FileReader();
    if (this.fileProfissional) {
      reader.readAsDataURL(this.fileProfissional);
    }
    reader.onload = () => {
      this.fotoProfissional = reader.result;
    };
  }

  onLoadFotoRgFrente(event: any) {
    this.fileRgFrente = event.target.files[0];
    var reader = new FileReader();
    if (this.fileRgFrente) {
      reader.readAsDataURL(this.fileRgFrente);
    }
    reader.onload = () => {
      this.fotoRgFrente = reader.result;
    };
  }

  onLoadFotoRgVerso(event: any) {
    this.fileRgVerso = event.target.files[0];
    var reader = new FileReader();
    if (this.fileRgVerso) {
      reader.readAsDataURL(this.fileRgVerso);
    }
    reader.onload = () => {
      this.fotoRgVerso = reader.result;
    };
  }

  onLoadFotoAssinatura(event: any) {
    this.fileAssinatura = event.target.files[0];
    var reader = new FileReader();
    if (this.fileAssinatura) {
      reader.readAsDataURL(this.fileAssinatura);
    }
    reader.onload = () => {
      this.fotoAssinatura = reader.result;
    };
  }

  onSubmit() {
    this._loading.emitChange(true);
    let profissional = this.profissionalForm.value;

    profissional.id = this._dadosLocalStorage.id;
    profissional.fotoCtps = this.fotoCtps;
    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRgFrente = this.fotoRgFrente;
    profissional.fotoRgVerso = this.fotoRgVerso;
    profissional.fotoAssinatura = this.fotoAssinatura;

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

    if(profissional.rg != null && profissional.rg != '') {
      if(profissional.rgDataEmissao == null || profissional.rgDataEmissao == ''){
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Data de emissão do RG obrigatória.',
          showConfirmButton: true,
        });
      return;
      }
      if(profissional.rgEmissor == null || profissional.rgEmissor == ''){
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
