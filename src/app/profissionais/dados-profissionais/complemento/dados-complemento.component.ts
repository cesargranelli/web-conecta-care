import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { CategoriaCNH } from 'src/app/classes/categoria-cnh.class';
import { Complemento } from 'src/app/classes/complemento.class';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ComplementoService } from 'src/app/services/complemento.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-complemento',
  templateUrl: './dados-complemento.component.html',
  styleUrls: ['./dados-complemento.component.css']
})
export class DadosComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public complementoForm: FormGroup;
  public categoriasCNH: Array<CategoriaCNH>;
  public validationHas: InputValidationHas;

  public fotoCNHFrente: any;
  public imagemFotoCNHFrente: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputFotoCNHFrente: string = 'fileinput-new';
  public fileFotoCNHFrente: File;

  public fotoCNHVerso: any;
  public imagemFotoCNHVerso: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputFotoCNHVerso: string = 'fileinput-new';
  public fileFotoCNHVerso: File;

  public showForm: boolean = true;
  private _dadosLocalStorage: Valid;
  private _dataValidadeHabilitacaoFinal: Date;
  public complemento: Complemento;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ComplementoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService,
    private _validService: SharedValidService
  ) {
    this._sharedLoadingService.emitChange(true);
    this.complementoForm = this._formBuilder.group({
      tituloEleitoral: [null, Validators.maxLength(11)],
      zonaEleitoral: [null, Validators.maxLength(3)],
      secaoEleitoral: [null, Validators.maxLength(4)],
      numeroHabilitacao: [null, [Validators.maxLength(11)]],
      dataValidadeHabilitacao: [null],
      categoriaCNH: [null],
      fotoCNHFrente: [null],
      fotoCNHVerso: [null],
      numeroReservista: [null],
      nomeMae: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoMae: [null, Validators.maxLength(60)],
      nomePai: [null, [Validators.maxLength(100)]],
      profissaoPai: [null, Validators.maxLength(60)],
      nomeConjuge: [null, [Validators.maxLength(100)]],
      profissaoConjuge: [null, Validators.maxLength(60)],
      filhos: [null],
      carteiraVacinacao: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.complemento = new Complemento();
    this._dadosLocalStorage = this._validService.getValid();
    this.validationHas = new InputValidationHas();
    this._dataValidadeHabilitacaoFinal = new Date();

    this._dominioService.getCategoriasCNH().pipe(
      map(categoriasCNH => {
        this.categoriasCNH = categoriasCNH.body;
      }),
      concatMap(() => this._service.getDados(this._dadosLocalStorage?.id))
    ).subscribe(dadosComplemento => {
      this.complemento = dadosComplemento;
      this.popularForm();
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select[id=\'categoriaCNH\']').selectpicker('refresh');
        this.showForm = false;
        this._sharedLoadingService.emitChange(false);
      });
    }
    );
    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }

  popularForm() {
    if (this.complemento) {
      this.complementoForm.patchValue({
        tituloEleitoral: this.complemento?.tituloEleitoral,
        zonaEleitoral: this.complemento?.zonaEleitoral,
        numeroHabilitacao: this.complemento?.numeroHabilitacao,
        categoriaCNH: this.complemento.categoriaCNH,
        secaoEleitoral: this.complemento.secaoEleitoral,
        dataValidadeHabilitacao: this.converterDataExibicao(this.complemento.dataValidadeHabilitacao?.date) ? this.converterDataExibicao(this.complemento.dataValidadeHabilitacao?.date) : null,
        numeroReservista: this.complemento.numeroReservista,
        nomeMae: this.complemento.nomeMae,
        profissaoMae: this.complemento.profissaoMae,
        nomePai: this.complemento.nomePai,
        profissaoPai: this.complemento.profissaoPai,
        nomeConjuge: this.complemento.nomeConjuge,
        profissaoConjuge: this.complemento.profissaoConjuge,
        filhos: this.complemento.filhos,
        carteiraVacinacao: this.complemento.carteiraVacinacao,
      });
      if (this._cadastro.complemento?.fotoCNHFrente) {
        this.imagemFotoCNHFrente = this._cadastro.complemento?.fotoCNHFrente;
        this.fotoCNHFrente = this._cadastro.complemento?.fotoCNHFrente;
        this.complementoForm.controls.fotoCNHFrente.setValue(this._cadastro.complemento?.fotoCNHFrente, { emitModelToViewChange: false });
      }
      if (this._cadastro.complemento?.fotoCNHVerso) {
        this.imagemFotoCNHVerso = this._cadastro.complemento?.fotoCNHVerso;
        this.fotoCNHVerso = this._cadastro.complemento?.fotoCNHVerso;
        this.complementoForm.controls.fotoCNHVerso.setValue(this._cadastro.complemento?.fotoCNHVerso, { emitModelToViewChange: false });
      }
    }
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);

    this.complemento = this.complementoForm.value;
    this.complemento.fotoCNHFrente = this.fotoCNHFrente;
    this.complemento.fotoCNHVerso = this.fotoCNHVerso;
    this.complemento.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this.complemento).subscribe(() => {
      setTimeout(() => {
        this._cadastro.complemento = this.complemento;
        this._router.navigateByUrl(`profissionais/${this._dadosLocalStorage.id}/dados-profissionais`, {
          state: { valid: this._dadosLocalStorage }
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Alteração realizada com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this._sharedLoadingService.emitChange(false);
      });
    },
      () => {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar alterar os dados complementares',
          showConfirmButton: true
        });
      });
  }

  converterDataExibicao(data: string): string {
    if (data) {
      let dia: string = data.slice(8, 10);
      let mes: string = data.slice(5, 7);
      let ano: string = data.slice(0, 4);
      return dia + '/' + mes + '/' + ano;
    }
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function (event: any) {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

  onLoadFotoCNHFrente(event: any) {
    this.fileFotoCNHFrente = event.target.files[0];
    let reader = new FileReader();
    if (this.fileFotoCNHFrente) {
      reader.readAsDataURL(this.fileFotoCNHFrente);
    }
    reader.onload = () => {
      this.fotoCNHFrente = reader.result;
    };
  }

  onLoadFotoCNHVerso(event: any) {
    this.fileFotoCNHVerso = event.target.files[0];
    let reader = new FileReader();
    if (this.fileFotoCNHVerso) {
      reader.readAsDataURL(this.fileFotoCNHVerso);
    }
    reader.onload = () => {
      this.fotoCNHVerso = reader.result;
    };
  }

  handlerReaderLoadedFotoCNHFrente(e: any) {
    this.fotoCNHFrente = btoa(e.target.result);
  }

  handlerReaderLoadedFotoCNHVerso(e: any) {
    this.fotoCNHVerso = btoa(e.target.result);
  }

}
