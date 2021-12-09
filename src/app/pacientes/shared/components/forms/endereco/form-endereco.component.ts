import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import Swal from 'sweetalert2';
import { EnderecoViaCep } from '../../../../../classes/endereco-via-cep.class';
import { Estado } from '../../../../../classes/estado.class';
import { Valid } from '../../../../../services/feat/Valid';
import { ViaCepService } from '../../../../../services/via-cep.service';
import { SharedLoadingService } from '../../../../../shared/services/shared-loading.service';
import { SharedValidService } from '../../../../../shared/services/shared-valid.service';
import { InputValidationHas } from '../../../../../shared/validations/input-validation-has';
import { EnderecoPaciente } from '../../../../classes/endereco-paciente.class';
import { Paciente } from '../../../../classes/paciente.class';
import { EnderecoService } from '../../../../services/endereco.service';
import { EstadoService } from '../../../../services/estado.service';
import { PacienteService } from '../../../../services/paciente.service';
import { Role } from 'src/app/enums/role.enum';

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
  public onSubmitEvent = new EventEmitter<EnderecoPaciente>();

  public enderecoForm: FormGroup;
  public estados: Array<Estado>;
  public valid: Valid;
  public estado: Estado;
  public fotoComprovante: any;
  public fileInputComprovante = 'fileinput-new';
  public imagemComprovante: any = '../../../../../assets/img/Headshot-Doc-1.png';
  public validationHas: InputValidationHas = new InputValidationHas();
  public esconderFormulario = true;
  public endereco: EnderecoPaciente = new EnderecoPaciente();
  public fileComprovante: File;
  public paciente: Paciente;
  pacienteId: number;
  campoHabilitado: boolean;

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _estadosService: EstadoService,
    private _viaCep: ViaCepService,
    private _enderecoService: EnderecoService,
    private _pacienteService: PacienteService,
    private _valid: SharedValidService,
    private _route: ActivatedRoute
  ) {
    this._loading.emitChange(true);
    this.pacienteId = this._route.snapshot.params.paciente_id;
    this.campoHabilitado = this._valid.getValid()?.role == Role.Paciente ? true : false;

    this.enderecoForm = this._formBuilder.group({
      logradouro: [null, [Validators.required, Validators.maxLength(60)]],
      numero: [null, [Validators.required, Validators.maxLength(10)]],
      complemento: [null, [Validators.maxLength(60)]],
      cep: [null, [Validators.required, Validators.maxLength(8)]],
      bairro: [null, [Validators.required, Validators.maxLength(50)]],
      cidade: [null, [Validators.required, Validators.maxLength(50)]],
      fotoComprovante: [null, [Validators.required]],
      estado: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this._estadosService.listarEstado().pipe(
      map(estados => {
        this.estados = estados;
        jQuery('select[id=\'estado\']').selectpicker('val', this.estado?.id);
      }),
      concatMap(() => this._pacienteService.pesquisarPorId(this.pacienteId).pipe(map(paciente => this.paciente = paciente))),
      concatMap(() => this._enderecoService.pesquisarEnderecoPorId(this.paciente?.endereco?.id))
    ).subscribe(endereco => {
      this.endereco = endereco;
      this.popularForm();
      setTimeout(() => {
        jQuery('select[id=\'estado\']').selectpicker('refresh');
        // this.enderecoForm.disable({ onlySelf: !this.campoHabilitado });
        this.esconderFormulario = false;
        this._loading.emitChange(false);
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
      if (this.endereco.fotoComprovante) {
        this.fotoComprovante = this.endereco.fotoComprovante;
        this.imagemComprovante = this.endereco.fotoComprovante;
        this.enderecoForm.controls.fotoComprovante.setValue(this.endereco.fotoComprovante, { emitModelToViewChange: false });
      }
    }
  }

  onSubmit() {
    if (!this.endereco) {
      this.endereco = new EnderecoPaciente();
    }
    this.endereco.logradouro = this.enderecoForm.value.logradouro;
    this.endereco.numero = this.enderecoForm.value.numero;
    this.endereco.complemento = this.enderecoForm.value.complemento;
    this.endereco.cep = this.enderecoForm.value.cep;
    this.endereco.bairro = this.enderecoForm.value.bairro;
    this.endereco.cidade = this.enderecoForm.value.cidade;
    this.endereco.fotoComprovante = this.fotoComprovante;
    this.endereco.estado = this.estados.filter(estado => estado.id === Number(this.enderecoForm.value.estado))[0];
    this.onSubmitEvent.emit(this.endereco);
  }

  onLoadComprovante(event: any) {
    this.fileComprovante = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.fileComprovante);
    reader.onload = () => {
      this.fotoComprovante = reader.result;
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
          this.estado = this.estados.find(estado => estado.uf == enderecoViaCep.uf);
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
          jQuery('select[id=\'estado\']').selectpicker('val', this.estado?.id);
          this._loading.emitChange(false);
        });
      });
  }

}
