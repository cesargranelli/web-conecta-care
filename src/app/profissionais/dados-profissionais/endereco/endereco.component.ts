import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {concatMap, map} from 'rxjs/operators';
import {Endereco} from 'src/app/classes/endereco.class';
import {DominioService} from 'src/app/services/dominio.service';
import {EnderecoService} from 'src/app/services/endereco.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {EnderecoViaCep} from '../../../classes/endereco-via-cep.class';
import {Estado} from '../../../classes/estado.class';
import {Pais} from '../../../classes/pais.class';
import {Role} from '../../../enums/role.enum';

declare var jQuery: any;

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  enderecoForm: FormGroup;
  public estados: Array<Estado>;
  public paises: Array<Pais>;
  public valid: Valid;
  public estadoViaCep: Estado;
  public endereco: Endereco;
  public comprovante: any;
  public fileInputComprovante: string = 'fileinput-new';
  public imagemComprovante: any = '../../../../../assets/img/Headshot-Doc-1.png';
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;
  private _fileComprovante: File;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EnderecoService,
    private _loading: SharedLoadingService
  ) {
    this.valid = this._validService.getValid();
    this._loading.emitChange(true);

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
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getEstados().pipe(
      map((response) => {
        this.estados = response.body;
      }),
      concatMap(() => this._dominioService.getPaises().pipe(map(response => {
        this.paises = response.body;
      }))),
      concatMap(() => this._service.getDados(this.valid.id))
    ).subscribe(
      dadosEndereco => {
        this.endereco = dadosEndereco;
        this.popularForm();
        jQuery('select').selectpicker('render');
        setTimeout(() => {
          jQuery('select').selectpicker('refresh');
          this._loading.emitChange(false);
        });
        this.showForm = false;
        this._loading.emitChange(false);
      });
  }

  popularForm() {
    if (this.endereco.cep) {
      this.enderecoForm.controls.logradouro.setValue(this.endereco.logradouro);
      this.enderecoForm.controls.numero.setValue(this.endereco.numero);
      this.enderecoForm.controls.complemento.setValue(this.endereco.complemento);
      this.enderecoForm.controls.cep.setValue(this.endereco.cep);
      this.enderecoForm.controls.bairro.setValue(this.endereco.bairro);
      this.enderecoForm.controls.cidade.setValue(this.endereco.cidade);
      this.enderecoForm.controls.estado.setValue(this.endereco.estado.id);
      this.enderecoForm.controls.pais.setValue(this.endereco.pais.id);
      if (this.endereco.comprovante) {
        this.comprovante = this.endereco.comprovante;
        this.imagemComprovante = this.comprovante;
        this.enderecoForm.controls.comprovante.setValue(this.endereco.comprovante, {emitModelToViewChange: false});
      }
    }
  }

  onSubmit() {
    this._loading.emitChange(true);

    this.endereco = this.enderecoForm.value;
    this.endereco.comprovante = this.comprovante;
    this.endereco.proprietarioId = this.valid.id;

    this._service.save(this.endereco).subscribe(() => {
        setTimeout(() => {
          this._loading.emitChange(false);
          this._router.navigateByUrl(`profissionais/${this.valid.id}`, {
            state: {valid: this.valid}
          });
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
        this._loading.emitChange(true);
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
