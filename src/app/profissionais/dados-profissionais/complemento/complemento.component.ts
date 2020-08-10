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

@Component({
  selector: 'app-complemento',
  templateUrl: './complemento.component.html',
  styleUrls: ['./complemento.component.css']
})
export class ComplementoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  private _valid: Valid;
  private _extensaoFotoCNH: string;


  public complementoForm: FormGroup;
  public categoriasCNH: CategoriaCNH[];
  public fotoCNH: any;
  public validationHas: InputValidationHas = new InputValidationHas();
  public dummyImage: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fileInputCnh: string = 'fileinput-new';
  public complemento: Complemento;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ComplementoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
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
  }

  ngOnInit(): void {
    this.complemento = new Complemento();

    this.fileInputCnh = 'fileinput-exists';

    // if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
    //   this._router.navigateByUrl('/');
    // }

    // this._dominioService.getCategoriasCNH().subscribe(response => {
    //   this.categoriasCNH = response.body
    // });


  }

  onSubmit() {

    console.log(this.complementoForm.value);
    // this._sharedLoadingService.emitChange(true);
    // this._complemento = this.complementoForm.value;
    //
    // this._complemento.fotoCNH = this._extensaoFotoCNH + this.fotoCNH;
    //
    // this._complemento.proprietarioId = this._valid.id;
    //
    // this._service.save(this._complemento).subscribe(response => {
    //     setTimeout(() => {
    //       this._cadastro.complemento = this._complemento;
    //       this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/conta`, {
    //         state: {valid: this._valid}
    //       });
    //       this._sharedLoadingService.emitChange(false);
    //     });
    //   },
    //   (error: Error) => {
    //     this._sharedLoadingService.emitChange(false);
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'Ocorreu um erro inexperado ao tentar inserir complemento',
    //       showConfirmButton: true
    //     });
    //   });

  }

  onLoadFotoCNH(event: any) {
    const file: File = event.target.files[0];
    let type: string[] = file.type.split('/');
    this._extensaoFotoCNH = type[1].padEnd(5, ' ');
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedProfissional.bind(this);
      reader.readAsBinaryString(file);
    }
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
