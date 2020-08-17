import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { CategoriaCNH } from 'src/app/classes/categoria-cnh.class';
import { Complemento } from 'src/app/classes/complemento.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ComplementoService } from 'src/app/services/complemento.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-complemento',
  templateUrl: './complemento.component.html',
  styleUrls: ['./complemento.component.css']
})
export class ComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  complementoForm: FormGroup;

  private valid: Valid;
  private complemento: Complemento;
  private fileFotoCNH: File;

  public categoriasCNH: CategoriaCNH[];
  public fotoCNH: any;
  public validationHas: InputValidationHas = new InputValidationHas();

  public fileInputFotoCNH: string = 'fileinput-new';
  public imagemFotoCNH: string = '../../../../../assets/img/Headshot-Placeholder-1.png';

  public showForm: boolean = true;

  constructor(
    private _router: Router,
    private _validService: ValidService,
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
      fotoCNH: [null],
      numeroReservista: [null],
      nomeMae: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoMae: [null, [Validators.maxLength(60)]],
      nomePai: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoPai: [null, [Validators.maxLength(60)]],
      nomeConjuge: [null, [Validators.required, Validators.maxLength(100)]],
      profissaoConjuge: [null, [Validators.maxLength(60)]],
      carteiraVacinacao: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

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
          jQuery("select[id='categoriaCNH']").selectpicker('refresh');
          jQuery(`select[id='categoriaCNH']`).selectpicker('val', this._cadastro.complemento?.categoriaCNH);
          this._loading.emitChange(false);
        });
        this.showForm = false;
    });

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });
  }

  popularForm() {
    this.complementoForm.patchValue({
      tituloEleitoral: this._cadastro.complemento?.tituloEleitoral,
      zonaEleitoral: this._cadastro.complemento?.zonaEleitoral,
      secaoEleitoral: this._cadastro.complemento?.secaoEleitoral,
      numeroHabilitacao: this._cadastro.complemento?.numeroHabilitacao,
      dataValidadeHabilitacao: this._cadastro.complemento?.dataValidadeHabilitacao,
      numeroReservista: this._cadastro.complemento?.numeroReservista,
      nomeMae: this._cadastro.complemento?.nomeMae ? this._cadastro.complemento?.nomeMae : null,
      profissaoMae: this._cadastro.complemento?.profissaoMae ? this._cadastro.complemento?.profissaoMae : '',
      nomePai: this._cadastro.complemento?.nomePai ? this._cadastro.complemento?.nomePai : null,
      profissaoPai: this._cadastro.complemento?.profissaoPai ? this._cadastro.complemento?.profissaoPai : '',
      nomeConjuge: this._cadastro.complemento?.nomeConjuge ? this._cadastro.complemento?.nomeConjuge : null,
      profissaoConjuge: this._cadastro.complemento?.profissaoConjuge ? this._cadastro.complemento?.profissaoConjuge : '',
      carteiraVacinacao: this._cadastro.complemento?.carteiraVacinacao
    });

    if (this._cadastro.complemento?.fotoCNH) {
      this.imagemFotoCNH = this._cadastro.complemento?.fotoCNH;
      this.fotoCNH = this._cadastro.complemento?.fotoCNH;
    }
  }

  onSubmit() {
    this._loading.emitChange(true);
    this.complemento = this.complementoForm.value;

    this.complemento.fotoCNH = this.fotoCNH;

    this.complemento.proprietarioId = this.valid.id;

    this._service.save(this.complemento).subscribe(response => {
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

  onLoadFotoCNH(event: any) {
    this.fileFotoCNH = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileFotoCNH);
    reader.onload = () => {
      this.fotoCNH = reader.result;
    };
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/escolaridade`);
  }

  limpar() {
    this.complementoForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery(".selectpicker").selectpicker('refresh');
    this.imagemFotoCNH = '../../../../../assets/img/Headshot-Placeholder-1.png';
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on("dp.change", function (event: any) {
      control.setValue(event?.date?._d?.toLocaleDateString());
    });
  }

}
