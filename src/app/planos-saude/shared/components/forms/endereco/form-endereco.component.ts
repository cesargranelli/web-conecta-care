import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { EnderecoViaCep } from 'src/app/classes/endereco-via-cep.class';
import { EnderecoPlanoSaude } from 'src/app/planos-saude/classes/endereco-plano-saude.class';
import { Estado } from 'src/app/classes/estado.class';
import { Pais } from 'src/app/classes/pais.class';
import { CadastroPlanosSaudeService } from 'src/app/planos-saude/services/cadastro-planos-saude.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-form-endereco-plano-saude',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.css']
})
export class FormEnderecoComponent implements OnInit {

  @Input()
  public isCadastro: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Input()
  public labelBotaoSubmit: string;

  @Output()
  public onSubmitEvent = new EventEmitter<EnderecoPlanoSaude>();

  public enderecoForm: FormGroup;
  public estados: Estado[];
  public paises: Pais[];
  public valid: Valid;
  public estadoViaCep: Estado;
  public comprovante: any;
  public fileInputComprovante: string = 'fileinput-new';
  public imagemComprovante: any = '../../../../../assets/img/Headshot-Doc-1.png';
  public validationHas: InputValidationHas = new InputValidationHas();
  public esconderFormulario: boolean = true;
  private endereco: EnderecoPlanoSaude;
  private fileComprovante: File;

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _viaCep: ViaCepService,
    private _cadastro: CadastroPlanosSaudeService
  ) {
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
        this.estados = response.body;
      }),
      concatMap(() => this._dominioService.getPaises().pipe(
        map(response => {
          this.paises = response.body;
        }))
      )
    ).subscribe(null, null, () => {
      setTimeout(() => {
        if (this._cadastro.endereco?.cep) {
          this.popularForm();
        }
        jQuery('select[id=\'pais\']').selectpicker('refresh');
        jQuery('select[id=\'pais\']').selectpicker('val', this._cadastro.endereco.pais?.id);
        jQuery('select[id=\'estado\']').selectpicker('refresh');
        jQuery('select[id=\'estado\']').selectpicker('val', this._cadastro.endereco.estado?.id);
        this._loading.emitChange(false);
        this.esconderFormulario = false;
      });
    });

  }

  popularForm() {
    this.enderecoForm.controls.logradouro.setValue(this._cadastro.endereco?.logradouro);
    this.enderecoForm.controls.numero.setValue(this._cadastro.endereco?.numero);
    this.enderecoForm.controls.complemento.setValue(this._cadastro.endereco?.complemento);
    this.enderecoForm.controls.cep.setValue(this._cadastro.endereco?.cep);
    this.enderecoForm.controls.bairro.setValue(this._cadastro.endereco?.bairro);
    this.enderecoForm.controls.cidade.setValue(this._cadastro.endereco?.cidade);
    this.enderecoForm.controls.pais.setValue(this._cadastro.endereco?.pais.id);
    this.enderecoForm.controls.estado.setValue(this._cadastro.endereco?.estado.id);
    if (this._cadastro.endereco?.comprovante) {
      this.comprovante = this._cadastro.endereco?.comprovante;
      this.imagemComprovante = this.comprovante;
      this.enderecoForm.controls.comprovante.setValue(this._cadastro.endereco?.comprovante, {emitModelToViewChange: false});
    }
  }

  onSubmit() {
    this.endereco = this.enderecoForm.value;
    this.endereco.comprovante = this.comprovante;
    this.endereco.estado = this.estados.filter(estado => estado.id == Number(this.endereco.estado))[0];
    this.endereco.pais = this.paises.filter(pais => pais.id == Number(this.endereco.pais))[0];
    this.onSubmitEvent.emit(this.endereco);
  }

  onLoadComprovante(event: any) {
    this.fileComprovante = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fileComprovante);
    reader.onload = () => {
      this.comprovante = reader.result;
    };
  }

  onReturn() {
    this._router.navigateByUrl(`${this.linkBotaoVoltar}`);
  }

  limpar() {
    this.enderecoForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery('.selectpicker').selectpicker('refresh');
    this.imagemComprovante = '../../../../../assets/img/Headshot-Doc-1.png';
  }

  pesquisarCep() {
    this._viaCep.findViaCep(this.enderecoForm.controls.cep.value).subscribe(
      response => {
        if (response.body?.erro) {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: '400-CEP Não localizado!',
            showConfirmButton: true,
          });
        } else {
          let enderecoViaCep: EnderecoViaCep = response.body;
          this.enderecoForm.controls.logradouro.setValue(enderecoViaCep.logradouro);
          this.enderecoForm.controls.bairro.setValue(enderecoViaCep.bairro);
          this.enderecoForm.controls.cidade.setValue(enderecoViaCep.localidade);
          this.estadoViaCep = this.estados.find(estado => estado.uf == enderecoViaCep.uf);
        }
        this._loading.emitChange(true);
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
          jQuery('select[id=\'estado\']').selectpicker('val', this.estadoViaCep?.id);
          this._loading.emitChange(false);
        });
      });
  }

}
