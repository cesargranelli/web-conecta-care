import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EnderecoPlanoSaude} from '../../../../../planos-saude/classes/endereco-plano-saude.class';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Estado} from '../../../../../classes/estado.class';
import {Valid} from '../../../../../services/feat/Valid';
import {InputValidationHas} from '../../../../../shared/validations/input-validation-has';
import {Router} from '@angular/router';
import {SharedLoadingService} from '../../../../../shared/services/shared-loading.service';
import {ViaCepService} from '../../../../../services/via-cep.service';
import {CadastroPlanosSaudeService} from '../../../../../planos-saude/services/cadastro-planos-saude.service';
import Swal from 'sweetalert2';
import {EnderecoViaCep} from '../../../../../classes/endereco-via-cep.class';
import {EstadoService} from "../../../../services/estado.service";

declare var jQuery: any;

@Component({
  selector: 'app-form-endereco-paciente',
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
  public estados: Array<Estado>;
  public valid: Valid;
  public estadoViaCep: Estado;
  public comprovante: any;
  public fileInputComprovante: string = 'fileinput-new';
  public imagemComprovante: any = '../../../../../assets/img/Headshot-Doc-1.png';
  public validationHas: InputValidationHas = new InputValidationHas();
  public esconderFormulario: boolean = false;
  private endereco: EnderecoPlanoSaude;
  private fileComprovante: File;

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _estadosService: EstadoService,
    private _viaCep: ViaCepService,
    private _cadastro: CadastroPlanosSaudeService
  ) {
    this._loading.emitChange(false);
    this.enderecoForm = this._formBuilder.group({
      logradouro: [null, [Validators.required, Validators.maxLength(60)]],
      numero: [null, [Validators.required, Validators.maxLength(10)]],
      complemento: [null, [Validators.maxLength(60)]],
      cep: [null, [Validators.required, Validators.maxLength(8)]],
      bairro: [null, [Validators.required, Validators.maxLength(50)]],
      cidade: [null, [Validators.required, Validators.maxLength(50)]],
      comprovante: [null, [Validators.required]],
      estado: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._estadosService.listarEstado().subscribe(estados => {
      this.estados = estados;
      console.log(this.estados);
      setTimeout(() => {
        jQuery('select[id=\'estado\']').selectpicker('refresh');
        jQuery('select[id=\'estado\']').selectpicker('val', this.estadoViaCep?.id);
        this._loading.emitChange(false);
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
    console.log(this.endereco)
    this.onSubmitEvent.emit(this.endereco);
  }

  onLoadComprovante(event: any) {
    this.fileComprovante = event.target.files[0];
    const reader = new FileReader();
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
          const enderecoViaCep: EnderecoViaCep = response.body;
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
