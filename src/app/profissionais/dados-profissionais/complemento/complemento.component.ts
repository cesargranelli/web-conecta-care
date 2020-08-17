import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CategoriaCNH} from 'src/app/classes/categoria-cnh.class';
import {Complemento} from 'src/app/classes/complemento.class';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ComplementoService} from 'src/app/services/complemento.service';
import {DominioService} from 'src/app/services/dominio.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {ValidService} from '../../../shared/services/shared-valid.service';
import {concatMap, map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-complemento',
  templateUrl: './complemento.component.html',
  styleUrls: ['./complemento.component.css']
})
export class ComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  private _valid: Valid;
  private _dadosLocalStorage: Valid;
  private _fileProfissional: File;
  private _dataValidadeHabilitacaoFinal: Date;

  public complementoForm: FormGroup;
  public categoriasCNH: Array<CategoriaCNH>;
  public validationHas: InputValidationHas;
  public fotoCNH: string | ArrayBuffer = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fileInputCnh: string = 'fileinput-new';
  public complemento: Complemento;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ComplementoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService,
    private _validService: ValidService
  ) {
    this._sharedLoadingService.emitChange(true);
    this.complementoForm = this._formBuilder.group({
      tituloEleitoral: [null, Validators.maxLength(11)],
      zonaEleitoral: [null, Validators.maxLength(3)],
      secaoEleitoral: [null, Validators.maxLength(4)],
      numeroHabilitacao: [null, [Validators.required, Validators.maxLength(11)]],
      dataValidadeHabilitacao: [null, Validators.required],
      categoriaCNH: [null, Validators.required],
      fotoCNH: [null, Validators.required],
      numeroReservista: [null],
      nomeMae: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoMae: [null, Validators.maxLength(60)],
      nomePai: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoPai: [null, Validators.maxLength(60)],
      nomeConjuge: [null, [Validators.required, Validators.maxLength(100)]],
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
      concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    ).subscribe(dadosComplemento => {
        this.complemento = dadosComplemento;
        if (this.complemento && this.complemento.fotoCNH) {
          this.fileInputCnh = 'fileinput-exists';
          this.fotoCNH = this.complemento.fotoCNH;
        }
        this.popularForm();
        jQuery('select').selectpicker('render');
        setTimeout(() => {
          jQuery('select[id=\'categoriaCNH\']').selectpicker('refresh');
          this._sharedLoadingService.emitChange(false);
        });
      }
    );

  }

  popularForm() {
    if (this.complemento) {
      this.complementoForm.patchValue({
        tituloEleitoral: this.complemento.tituloEleitoral,
        zonaEleitoral: this.complemento.zonaEleitoral,
        numeroHabilitacao: this.complemento.numeroHabilitacao,
        categoriaCNH: this.complemento.categoriaCNH,
        secaoEleitoral: this.complemento.secaoEleitoral,
        dataValidadeHabilitacao: this.converterDataExibicao(this.complemento.dataValidadeHabilitacao.date),
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
    }
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);

    this.complemento = this.complementoForm.value;
    this.complemento.fotoCNH = this.fotoCNH;
    this.complemento.proprietarioId = this._dadosLocalStorage.id;
    // this._service.save(this.complemento).subscribe(() => {
    //     setTimeout(() => {
    //       this._cadastro.complemento = this.complemento;
    //       this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/conta`, {
    //         state: {valid: this._valid}
    //       });
    //       this._sharedLoadingService.emitChange(false);
    //     });
    //   },
    //   () => {
    //     this._sharedLoadingService.emitChange(false);
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'Ocorreu um erro inexperado ao tentar inserir complemento',
    //       showConfirmButton: true
    //     });
    //   });
  }

  converterDataExibicao(data: string): string {
    let dia: string = data.slice(8, 10);
    let mes: string = data.slice(5, 7);
    let ano: string = data.slice(0, 4);
    return dia + '/' + mes + '/' + ano;
  }

  // converterData(data: string): string {
  //   let dia: number = Number(data.slice(0, 2));
  //   let mes: number = Number(data.slice(2, 4));
  //   let ano: number = Number(data.slice(4, 8));
  //   console.log('dia: ' + dia);
  //   console.log('mes: ' + mes);
  //   console.log('ano: ' + ano);
  //   console.log(this._dataValidadeHabilitacaoFinal.setFullYear(ano, mes, dia));
  //   return ' ';
  //
  // }

  onLoadFotoCNH(event: any) {
    this._fileProfissional = event.target.files[0];
    let reader = new FileReader();
    if (this._fileProfissional) {
      this.fileInputCnh = 'fileinput-exists';
      reader.readAsDataURL(this._fileProfissional);
    }
    reader.onload = () => {
      this.fotoCNH = reader.result;
    };
  }

  handlerReaderLoadedProfissional(e: any) {
    this.fotoCNH = btoa(e.target.result);
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/escolaridade`, {
      state: {valid: this._valid}
    });
  }

}
