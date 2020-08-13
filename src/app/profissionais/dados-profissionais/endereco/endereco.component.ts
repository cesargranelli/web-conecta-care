import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Endereco} from 'src/app/classes/endereco.class';
import {DominioService} from 'src/app/services/dominio.service';
import {EnderecoService} from 'src/app/services/endereco.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {concatMap, map} from 'rxjs/operators';
import {ValidService} from '../../../shared/services/shared-valid.service';
import {Estado} from '../../../classes/estado.class';

declare var jQuery: any;

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;
  private _extensaoComprovante: string;
  private _fileComprovante: File;

  public validationHas: InputValidationHas;
  public fotoComprovante: string | ArrayBuffer = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fileInputComprovante: string = 'fileinput-new';
  public enderecoForm: FormGroup;
  public endereco: Endereco;
  public estados: Array<Estado>;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EnderecoService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService,
    private _validService: ValidService
  ) {
    this._sharedLoadingService.emitChange(true);

    this.enderecoForm = this._formBuilder.group({
      logradouro: [null, [Validators.required, Validators.maxLength(60)]],
      numero: [null, [Validators.required, Validators.maxLength(10)]],
      complemento: [null, Validators.maxLength(60)],
      cep: [null, [Validators.required, Validators.maxLength(8)]],
      bairro: [null, [Validators.required, Validators.maxLength(50)]],
      cidade: [null, [Validators.required, Validators.maxLength(50)]],
      comprovante: [null, Validators.required],
      estado: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dadosLocalStorage = this._validService.getValid();

    this._dominioService.getEstados().pipe(
      map(estados => this.estados = estados.body),
      concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    ).subscribe(endereco => {
      this.endereco = endereco;
      this.popularForm();
      if (this.endereco && this.endereco.comprovante) {
        this.fileInputComprovante = 'fileinput-exists';
        this.fotoComprovante = this.endereco.comprovante;
      }
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this._sharedLoadingService.emitChange(false);
      });
    });
  }

  popularForm() {
    if (this.endereco) {
      this.enderecoForm.patchValue({
        logradouro: this.endereco.logradouro,
        numero: this.endereco.numero,
        complemento: this.endereco.complemento,
        cep: this.endereco.cep,
        bairro: this.endereco.bairro,
        cidade: this.endereco.cidade,
        estado: this.endereco.estado
      });
    }
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this.endereco = this.enderecoForm.value;

    this.endereco.comprovante = this._extensaoComprovante + this.fotoComprovante;
    this.endereco.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this.endereco).subscribe(() => {
        setTimeout(() => {
          this._cadastro.endereco = this.endereco;
          this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/contato`, {
            state: {valid: this._dadosLocalStorage}
          });
          this._sharedLoadingService.emitChange(false);
        });
      },
      () => {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
          showConfirmButton: true
        });
      });
  }

  onLoadFotoComprovante(event: any) {
    this._fileComprovante = event.target.files[0];
    let reader = new FileReader();
    if (this._fileComprovante) {
      reader.readAsDataURL(this._fileComprovante);
    }
    reader.onload = () => {
      this.fotoComprovante = reader.result;
    };
  }

  handlerReaderLoadedProfissional(e: any) {
    this.fotoComprovante = btoa(e.target.result);
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/informacoes-gerais`, {
      state: {valid: this._dadosLocalStorage}
    });
  }

}
