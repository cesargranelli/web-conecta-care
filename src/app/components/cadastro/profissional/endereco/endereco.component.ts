import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EnderecoViaCep} from 'src/app/classes/endereco-via-cep.class';
import {Endereco} from 'src/app/classes/endereco.class';
import {Estado} from 'src/app/classes/estado.class';
import {Pais} from 'src/app/classes/pais.class';
import {Role} from 'src/app/enums/role.enum';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {DominioService} from 'src/app/services/dominio.service';
import {EnderecoService} from 'src/app/services/endereco.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {concatMap, map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  enderecoForm: FormGroup;
  public estados: Estado[];
  public paises: Pais[];
  public valid: Valid;
  public estadoViaCep: Estado;
  public comprovante: any;
  public fileInputComprovante: string = 'fileinput-new';
  public imagemComprovante: any = '../../../../../assets/img/Headshot-Doc-1.png';
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;
  private _endereco: Endereco;
  private _fileComprovante: File;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EnderecoService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.enderecoForm = this._formBuilder.group({
      logradouro: [null, [Validators.required, Validators.maxLength(60)]],
      numero: [null, [Validators.required, Validators.maxLength(10)]],
      complemento: [null, [Validators.maxLength(60)]],
      cep: [null, [Validators.required, Validators.maxLength(8)]],
      bairro: [null, [Validators.required, Validators.maxLength(50)]],
      cidade: [null, [Validators.required, Validators.maxLength(50)]],
      comprovante: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      pais: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._dominioService.getEstados().pipe(
      map((response) => {
        this._loading.emitChange(true);
        this.estados = response.body;
      }),
      concatMap(() => this._dominioService.getPaises().pipe(
        map(response => {
          this.paises = response.body;
        }))
      )
    ).subscribe(
      null,
      null,
      () => {
        if (this._cadastro.endereco) {
          this.popularForm();
        }
        setTimeout(() => {
          jQuery('select[id=\'estado\']').selectpicker('refresh');
          jQuery(`select[id='estado']`).selectpicker('val', this._cadastro.endereco?.estado);
          jQuery('select[id=\'pais\']').selectpicker('refresh');
          jQuery(`select[id='pais']`).selectpicker('val', this._cadastro.endereco?.pais);
          this._loading.emitChange(false);
        });
        this.showForm = false;
      });

    this._loading.emitChange(false);
  }

  popularForm() {
    this.enderecoForm.controls.logradouro.setValue(this._cadastro.endereco?.logradouro);
    this.enderecoForm.controls.numero.setValue(this._cadastro.endereco?.numero);
    this.enderecoForm.controls.complemento.setValue(this._cadastro.endereco?.complemento);
    this.enderecoForm.controls.cep.setValue(this._cadastro.endereco?.cep);
    this.enderecoForm.controls.bairro.setValue(this._cadastro.endereco?.bairro);
    this.enderecoForm.controls.cidade.setValue(this._cadastro.endereco?.cidade);
    if (this._cadastro.endereco?.comprovante) {
      this.comprovante = this._cadastro.endereco?.comprovante;
      this.imagemComprovante = this.comprovante;
      this.enderecoForm.controls.comprovante.setValue(this._cadastro.endereco?.comprovante, {emitModelToViewChange: false});
    }
  }

  onSubmit() {
    this._loading.emitChange(true);
    this._endereco = this.enderecoForm.value;

    this._endereco.comprovante = this.comprovante;
    this._endereco.proprietarioId = this.valid.id;

    this._service.save(this._endereco).subscribe(response => {
        setTimeout(() => {
          this._cadastro.endereco = this._endereco;
          this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/contato`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
          showConfirmButton: true
        });
      });
  }

  onLoadComprovante(event: any) {
    this._fileComprovante = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this._fileComprovante);
    reader.onload = () => {
      this.comprovante = reader.result;
    };
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/informacoes-gerais`);
  }

  limpar() {
    this.enderecoForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery('.selectpicker').selectpicker('refresh');
    this.imagemComprovante = '../../../../../assets/img/Headshot-Doc-1.png';
  }

  pesquisarCep() {
    this._service.findViaCep(this.enderecoForm.controls.cep.value).subscribe(
      response => {
        if (response.body?.erro) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '400-CEP Não localizado!',
            showConfirmButton: true,
          });
        }
        this._loading.emitChange(false);
        let enderecoViaCep: EnderecoViaCep = response.body;
        this.enderecoForm.controls.logradouro.setValue(enderecoViaCep.logradouro);
        this.enderecoForm.controls.bairro.setValue(enderecoViaCep.bairro);
        this.enderecoForm.controls.cidade.setValue(enderecoViaCep.localidade);
        this.estadoViaCep = this.estados.find(estado => estado.uf == enderecoViaCep.uf);
      },
      (error: Error) => Swal.fire({
        position: 'center',
        icon: 'error',
        title: error.message,
        showConfirmButton: true,
      }),
      () => {
        setTimeout(() => {
          jQuery('select[id=\'estado\']').selectpicker('refresh');
          jQuery('select[id=\'estado\']').selectpicker('val', this.estadoViaCep.id);
          this._loading.emitChange(false);
        });
      });
  }

}
