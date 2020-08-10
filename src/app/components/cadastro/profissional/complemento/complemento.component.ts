import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { CategoriaCNH } from 'src/app/classes/categoria-cnh.class';
import { Complemento } from 'src/app/classes/complemento.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ComplementoService } from 'src/app/services/complemento.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { ValidService } from 'src/app/shared/services/shared-valid.service';

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
  private extensaoFotoCNH: string;
  private fileFotoCNH: File;

  public categoriasCNH: CategoriaCNH[];
  public fotoCNH: any;
  public validationHas: InputValidationHas = new InputValidationHas();

  public fotoProfissional: any;
  public fotoRg: any;

  public fileInputFotoCNH: string = 'fileinput-new';
  public imagemFotoCNH: string = '../../../../../assets/img/Headshot-Placeholder-1.png';

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ComplementoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getCategoriasCNH().subscribe(response => {
      this.categoriasCNH = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='categoriaCNH']").selectpicker('refresh');
      })
    });

    this.complementoForm = this._formBuilder.group({
      tituloEleitoral: [this._cadastro.complemento?.tituloEleitoral, [Validators.maxLength(11)]],
      zonaEleitoral: [this._cadastro.complemento?.zonaEleitoral, [Validators.maxLength(3)]],
      secaoEleitoral: [this._cadastro.complemento?.secaoEleitoral, [Validators.maxLength(4)]],
      numeroHabilitacao: [this._cadastro.complemento?.numeroHabilitacao, [Validators.required, Validators.maxLength(11)]],
      dataValidadeHabilitacao: [this._cadastro.complemento?.dataValidadeHabilitacao, [Validators.required]],
      categoriaCNH: ['', [Validators.required]],
      fotoCNH: ['', [Validators.required]],
      numeroReservista: [this._cadastro.complemento?.numeroReservista],
      nomeMae: [this._cadastro.complemento?.nomeMae, [Validators.required, Validators.maxLength(100)]],
      profissaoMae: [this._cadastro.complemento?.profissaoMae, [Validators.maxLength(60)]],
      nomePai: [this._cadastro.complemento?.nomePai, [Validators.required, Validators.maxLength(100)]],
      profissaoPai: [this._cadastro.complemento?.profissaoPai, [Validators.maxLength(60)]],
      nomeConjuge: [this._cadastro.complemento?.nomeConjuge, [Validators.required, Validators.maxLength(100)]],
      profissaoConjuge: [this._cadastro.complemento?.profissaoConjuge, [Validators.maxLength(60)]],
      filhos: [{}],
      carteiraVacinacao: ['', [Validators.required]],
    });

    if (this._cadastro.complemento?.fotoCNH) {
      this.imagemFotoCNH = this._cadastro.complemento?.fotoCNH;
      this.fileInputFotoCNH = 'fileinput-exists';
    }

  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this.complemento = this.complementoForm.value;

    this.complemento.fotoCNH = this.extensaoFotoCNH + this.fotoCNH;

    this.complemento.proprietarioId = this.valid.id;

    this._service.save(this.complemento).subscribe(response => {
      setTimeout(() => {
        this._cadastro.complemento = this.complemento;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/conta`);
        this._sharedLoadingService.emitChange(false);
      });
    },
    (error: Error) => {
      this._sharedLoadingService.emitChange(false);
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
    this.imagemFotoCNH = '../../../../../assets/img/Headshot-Doc-1.png';
  }

}
