import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { EstadoCivil } from 'src/app/classes/estado-civil.class';
import { Genero } from 'src/app/classes/genero.class';
import { TipoEmpresa } from 'src/app/classes/tipo-empresa.class';
import { Modulo } from 'src/app/enums/modulo.enum';
import { Role } from 'src/app/enums/role.enum';
import { EstadoCivilService } from 'src/app/pacientes/services/estado-civil.service';
import { GeneroService } from 'src/app/pacientes/services/genero.service';
import { PacienteService } from 'src/app/pacientes/services/paciente.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { Paciente } from '../../../../classes/paciente.class';
import { DadosResponsavelDependenteService } from '../../../services/dados-responsavel-dependente.service';

declare var jQuery: any;

@Component({
  selector: 'app-form-informacoes-gerais',
  templateUrl: './form-informacoes-gerais.component.html',
  styleUrls: ['./form-informacoes-gerais.component.css']
})
export class FormInformacoesGeraisComponent implements OnInit {

  @Input()
  public isCadastro: boolean;
  @Input()
  public linkBotaoVoltar: string;
  @Input()
  public labelBotaoSubmit: string;
  @Output()
  public onSubmitEvent: EventEmitter<Paciente>;

  private readonly CAMINHO_IMAGEM_DUMMY: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  private readonly FILEINPUT_NEW: string = 'fileinput-new';
  private readonly FILEINPUT_EXISTS: string = 'fileinput-exists';
  private readonly SLASH: string = '/';
  private readonly HIFEN: string = '-';

  public pacienteForm: FormGroup;
  public generos: Array<Genero>;
  public tipoEmpresas: Array<TipoEmpresa>;
  public estadosCivil: Array<EstadoCivil>;
  public validationHas: InputValidationHas = new InputValidationHas();
  public fileInputPaciente: string | ArrayBuffer = this.FILEINPUT_NEW;
  public fileInputRg: string | ArrayBuffer = this.FILEINPUT_NEW;
  public fileInputCpf: string | ArrayBuffer = this.FILEINPUT_NEW;
  public hideForm = true;
  public paciente: Paciente;
  public fotoPaciente: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public fotoRg: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public fotoCpf: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public campoHabilitado: boolean;
  public pacienteDependente: boolean = false;
  private _filePaciente: File;
  private _fileRg: File;
  private _fileCpf: File;
  private _dadosLocalStorage: Valid = new Valid();
  private _dataAtual: Date;

  constructor(
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _pacienteService: PacienteService,
    private _generoService: GeneroService,
    private _estadoCivilService: EstadoCivilService,
    private _loading: SharedLoadingService,
    private _route: ActivatedRoute,
    private _dados: DadosResponsavelDependenteService
  ) {
    this.onSubmitEvent = new EventEmitter<Paciente>();
    this._dadosLocalStorage.id = this._route.snapshot.params.paciente_id;
    this._loading.emitChange(true);
    this.hideForm = true;
    this.campoHabilitado = this._validService.getValid(Modulo.Paciente)?.role == Role.Paciente ? true : false;

    this.pacienteForm = this._formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, [Validators.required, Validators.maxLength(60)]],
      cpf: [null, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [null, Validators.minLength(10)],
      rg: [null, Validators.minLength(9)],
      rgEmissor: [null, Validators.minLength(3)],
      rgDataEmissao: [null, Validators.minLength(10)],
      genero: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      fotoPaciente: [null, Validators.required],
      fotoRg: [null, Validators.required],
      fotoCpf: [null],
    });

    if (this._dados.responsavel?.titularId != null) {
      this.pacienteDependente = true;
      this.pacienteForm.controls.fotoPaciente.setValidators(null);
      this.pacienteForm.controls.fotoRg.setValidators(null);
      this.pacienteForm.controls.fotoCpf.setValidators(null);
    }
  }

  public ngOnInit() {
    this.paciente = new Paciente();
    this._dataAtual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this._generoService.listarGenero().pipe(
      map(response => this.generos = response.body),
      concatMap(() => this._estadoCivilService.listarEstadoCivil().pipe(map(response => this.estadosCivil = response.body))),
      concatMap(() => this._pacienteService.pesquisarPorId(this._dadosLocalStorage.id))
    ).subscribe(paciente => {
      this.paciente = paciente;
      this.popularForm();
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        // this.pacienteForm.disable({ onlySelf: !this.campoHabilitado });
        this.hideForm = false;
        this._loading.emitChange(false);
      });
    });
    jQuery('.datetimepicker').datetimepicker({
      locale: 'pt-BR',
      format: 'L',
      icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: 'fa fa-chevron-left',
        next: 'fa fa-chevron-right',
        today: 'fa fa-screenshot',
        clear: 'fa fa-trash',
        close: 'fa fa-remove'
      }
    });
  }

  private popularForm() {
    if (this.paciente) {
      this.pacienteForm.patchValue({
        nome: this.paciente.nome,
        sobrenome: this.paciente.sobrenome,
        cpf: this.paciente.cpf,
        dataNascimento: this.formatarData(this.paciente.dataNascimento),
        rg: this.paciente.rg,
        rgEmissor: this.paciente.rgEmissor,
        rgDataEmissao: this.formatarData(this.paciente.rgDataEmissao),
        genero: this.paciente.genero.id,
        estadoCivil: this.paciente.estadoCivil.id
      });
      if (this.paciente.foto) {
        this.fotoPaciente = this.paciente.foto;
        this.fileInputPaciente = this.paciente.foto;
        this.pacienteForm.controls.fotoPaciente.setValue(this.paciente.foto, { emitModelToViewChange: false });
      }
      if (this.paciente.fotoRg) {
        this.fotoRg = this.paciente.fotoRg;
        this.fileInputRg = this.paciente.fotoRg;
        this.pacienteForm.controls.fotoRg.setValue(this.paciente.fotoRg, { emitModelToViewChange: false });
      }
      if (this.paciente.fotoCpf) {
        this.fotoCpf = this.paciente.fotoCpf;
        this.fileInputCpf = this.paciente.fotoCpf;
        this.pacienteForm.controls.fotoCpf.setValue(this.paciente.fotoCpf, { emitModelToViewChange: false });
      }
    }
  }

  public onLoadFotoPaciente(event: any) {
    this._filePaciente = event.target.files[0];
    const reader: FileReader = new FileReader();
    if (this._filePaciente) {
      reader.readAsDataURL(this._filePaciente);
      this.fileInputPaciente = this.FILEINPUT_EXISTS;
    }
    reader.onload = () => {
      this.fotoPaciente = reader.result;
    };
  }

  public onLoadFotoRg(event: any) {
    this._fileRg = event.target.files[0];
    const reader: FileReader = new FileReader();
    if (this._fileRg) {
      reader.readAsDataURL(this._fileRg);
      this.fileInputRg = this.FILEINPUT_EXISTS;
    }
    reader.onload = () => {
      this.fotoRg = reader.result;
    };
  }

  public onLoadFotoCpf(event: any) {
    this._fileCpf = event.target.files[0];
    const reader: FileReader = new FileReader();
    if (this._fileCpf) {
      reader.readAsDataURL(this._fileCpf);
      this.fileInputCpf = this.FILEINPUT_EXISTS;
    }
    reader.onload = () => {
      this.fotoCpf = reader.result;
    };
  }

  public onSubmit() {

    this._loading.emitChange(true);
    this.paciente = this.pacienteForm.value;
    this.paciente.id = this._dadosLocalStorage.id;
    this.paciente.dataNascimento = this.formatarData(this.paciente.dataNascimento);
    this.paciente.rgDataEmissao = this.formatarData(this.paciente.rgDataEmissao);
    this.paciente.estadoCivil = this.estadosCivil.find(estadoCivil => estadoCivil.id === this.pacienteForm.controls.estadoCivil.value);
    this.paciente.genero = this.generos.find(genero => genero.id === this.pacienteForm.controls.genero.value);
    this.paciente.foto = this.fotoPaciente;
    this.paciente.fotoRg = this.fotoRg;
    this.paciente.fotoCpf = this.fotoCpf;

    if (this._dados.responsavel?.titularId != null) {
      this.paciente.titularId = this._dados.responsavel.titularId;
      this.paciente.responsavelCadastroId = this._dados.responsavel.responsavelCadastroId;
      this.paciente.modulo = this._dados.responsavel.modulo;
    }

    if (this.dataEmissaoMenorDataNascimento(this.paciente.rgDataEmissao, this.paciente.dataNascimento)) {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'A data de emiss??o do RG deve ser maior do que a data de nascimento',
        showConfirmButton: true,
      });
      return;
    }

    if (this.validarIdade(this.paciente.dataNascimento)) {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Necess??rio ter 18 anos ou mais para se cadastrar',
        showConfirmButton: true,
      });
      return;
    }

    if (!this._dadosLocalStorage) {
      this._validService.setValid(new Valid());
    }

    this.onSubmitEvent.emit(this.paciente);
  }

  private dataEmissaoMenorDataNascimento(dataEmissao: string, dataNascimento: string): boolean {
    return new Date(dataEmissao) < new Date(dataNascimento);
  }

  private validarIdade(dataNascimento: any) {
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let anoNascParts = dataNascimento.split('/');
    let diaNasc = anoNascParts[0];
    let mesNasc = anoNascParts[1];
    let anoNasc = anoNascParts[2];
    let idade = anoAtual - anoNasc;
    let mesAtual = dataAtual.getMonth() + 1;

    if (mesAtual < mesNasc) {
      idade--;
    } else if (mesAtual === mesNasc && new Date().getDate() < diaNasc) {
      idade--;
    }
    if (idade < 18) {
      return true;
    }
  }

  public dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function () {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

  private formatarData(data: string): string {
    if (data.indexOf(this.SLASH) != -1) {
      const dataArray: Array<string> = data.split(this.SLASH);
      const dia = dataArray[0];
      const mes = dataArray[1];
      const ano = dataArray[2];
      return ano + this.HIFEN + mes + this.HIFEN + dia;
    } else {
      const dataArray: Array<string> = data.split(this.HIFEN);
      const dia = dataArray[2];
      const mes = dataArray[1];
      const ano = dataArray[0];
      return dia + this.SLASH + mes + this.SLASH + ano;
    }
  }

  public limparForm() {
    this.pacienteForm.reset();
    jQuery('select').selectpicker('render');
    this.fotoPaciente = this.CAMINHO_IMAGEM_DUMMY;
    this.fotoRg = this.CAMINHO_IMAGEM_DUMMY;
    this.fotoCpf = this.CAMINHO_IMAGEM_DUMMY;
    setTimeout(() => {
      jQuery('select').selectpicker('refresh');
    });
  }
}
