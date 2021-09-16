import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
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
  templateUrl: './cadastro-complemento.component.html',
  styleUrls: ['./cadastro-complemento.component.css']
})
export class CadastroComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  complementoForm: FormGroup;
  public categoriasCNH: CategoriaCNH[];
  public validationHas: InputValidationHas = new InputValidationHas();

  public fotoCNHFrente: any;
  public imagemFotoCNHFrente: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputFotoCNHFrente: string = 'fileinput-new';
  public fileFotoCNHFrente: File;

  public fotoCNHVerso: any;
  public imagemFotoCNHVerso: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputFotoCNHVerso: string = 'fileinput-new';
  public fileFotoCNHVerso: File;

  public showForm: boolean = true;
  private valid: Valid;
  private complemento: Complemento;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ComplementoService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.complementoForm = this._formBuilder.group({
      tituloEleitoral: [null, [Validators.maxLength(11)]],
      zonaEleitoral: [null, [Validators.maxLength(3)]],
      secaoEleitoral: [null, [Validators.maxLength(4)]],
      numeroHabilitacao: [null, [Validators.maxLength(11)]],
      dataValidadeHabilitacao: [null],
      categoriaCNH: [null],
      fotoCNHFrente: [null],
      fotoCNHVerso: [null],
      numeroReservista: [null],
      nomeMae: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoMae: [null, [Validators.maxLength(60)]],
      nomePai: [null, [Validators.maxLength(100)]],
      profissaoPai: [null, [Validators.maxLength(60)]],
      nomeConjuge: [null, [Validators.maxLength(100)]],
      profissaoConjuge: [null, [Validators.maxLength(60)]],
      carteiraVacinacao: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._dominioService.getCategoriasCNH().pipe(
      map(response => {
        this._loading.emitChange(true);
        this.categoriasCNH = response.body;
      })
    ).subscribe(
      null,
      null,
      () => {
        this.popularForm();
        setTimeout(() => {
          jQuery('select[id=\'categoriaCNH\']').selectpicker('refresh');
          jQuery(`select[id='categoriaCNH']`).selectpicker('val', this._cadastro.complemento?.categoriaCNH);
          this._loading.emitChange(false);
        });
        this.showForm = false;
      });

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }

  popularForm() {
    this.complementoForm.patchValue({
      tituloEleitoral: this._cadastro.complemento?.tituloEleitoral,
      zonaEleitoral: this._cadastro.complemento?.zonaEleitoral,
      secaoEleitoral: this._cadastro.complemento?.secaoEleitoral,
      numeroHabilitacao: this._cadastro.complemento?.numeroHabilitacao,
      dataValidadeHabilitacao: this._cadastro.complemento?.dataValidadeHabilitacao ? this._cadastro.complemento?.dataValidadeHabilitacao : null,
      numeroReservista: this._cadastro.complemento?.numeroReservista,
      nomeMae: this._cadastro.complemento?.nomeMae ? this._cadastro.complemento?.nomeMae : null,
      profissaoMae: this._cadastro.complemento?.profissaoMae ? this._cadastro.complemento?.profissaoMae : '',
      nomePai: this._cadastro.complemento?.nomePai ? this._cadastro.complemento?.nomePai : '',
      profissaoPai: this._cadastro.complemento?.profissaoPai ? this._cadastro.complemento?.profissaoPai : '',
      nomeConjuge: this._cadastro.complemento?.nomeConjuge ? this._cadastro.complemento?.nomeConjuge : '',
      profissaoConjuge: this._cadastro.complemento?.profissaoConjuge ? this._cadastro.complemento?.profissaoConjuge : '',
      carteiraVacinacao: this._cadastro.complemento?.carteiraVacinacao
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

  onSubmit() {
    this._loading.emitChange(true);
    this.complemento = this.complementoForm.value;

    this.complemento.fotoCNHFrente = this.fotoCNHFrente;
    this.complemento.fotoCNHVerso = this.fotoCNHVerso;

    this.complemento.proprietarioId = this.valid.id;

    this.complemento.dataValidadeHabilitacao = this.formataData(this.complemento.dataValidadeHabilitacao);

    console.log(this.complemento);

    this._service.save(this.complemento).subscribe(() => {
      setTimeout(() => {
        this._cadastro.complemento = this.complemento;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/conta`);
        this._loading.emitChange(false);
      });
    },
      (error: Error) => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir complemento',
          showConfirmButton: true
        });
      });

  }

  onLoadFotoCNHFrente(event: any) {
    this.fileFotoCNHFrente = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileFotoCNHFrente);
    reader.onload = () => {
      this.fotoCNHFrente = reader.result;
    };
  }

  onLoadFotoCNHVerso(event: any) {
    this.fileFotoCNHVerso = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileFotoCNHVerso);
    reader.onload = () => {
      this.fotoCNHVerso = reader.result;
    };
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/escolaridade`);
  }

  limpar() {
    this.complementoForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery('.selectpicker').selectpicker('refresh');
    this.imagemFotoCNHFrente = '../../../../../assets/img/default-paisagem.png';
    this.imagemFotoCNHVerso = '../../../../../assets/img/default-paisagem.png';
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function (event: any) {
      control.setValue(event?.date?._d?.toLocaleDateString());
    });
  }

  convertToDate(stringDate: string): Date {
    if (!!stringDate) {
      const arrayDate: string[] = stringDate.split('/').reverse();
      return new Date(Number(arrayDate[0]), Number(arrayDate[1]) - 1, Number(arrayDate[2]), 0, 0, 0);
    } else {
      return new Date();
    }
  }

  formataData(dataString: string): string {
    if (!!dataString) {
      let data = this.convertToDate(dataString);
      let dia = data.getDate().toString().padStart(2, '0');
      let mes = (data.getMonth() + 1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
      let ano = data.getFullYear();
      return dia + "/" + mes + "/" + ano;
    } else {
      return null;
    }
  }
  }
