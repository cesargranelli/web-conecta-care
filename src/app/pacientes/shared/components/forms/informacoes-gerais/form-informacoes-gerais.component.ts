import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {concatMap, map} from 'rxjs/operators';
import {EstadoCivil} from 'src/app/classes/estado-civil.class';
import {Genero} from 'src/app/classes/genero.class';
import {TipoEmpresa} from 'src/app/classes/tipo-empresa.class';
import {EstadoCivilService} from 'src/app/pacientes/services/estado-civil.service';
import {GeneroService} from 'src/app/pacientes/services/genero.service';
import {PacienteService} from 'src/app/pacientes/services/paciente.service';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {Paciente} from "../../../../classes/paciente.class";

declare var jQuery: any;

@Component({
  selector: 'app-form-informacoes-gerais',
  templateUrl: './form-informacoes-gerais.component.html',
  styleUrls: ['./form-informacoes-gerais.component.css']
})
export class FormInformacoesGeraisComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  private readonly CAMINHO_IMAGEM_DUMMY: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  private readonly FILEINPUT_NEW: string = 'fileinput-new';
  private readonly FILEINPUT_EXISTS: string = 'fileinput-exists';

  public pacienteForm: FormGroup;
  public generos: Array<Genero>;
  public tipoEmpresas: Array<TipoEmpresa>;
  public estadosCivil: Array<EstadoCivil>;
  public validationHas: InputValidationHas = new InputValidationHas();
  public fileInputPaciente: string = this.FILEINPUT_NEW;
  public fileInputRg: string = this.FILEINPUT_NEW;
  public fileInputCpf: string = this.FILEINPUT_NEW;
  public hideForm: boolean = true;
  public paciente: Paciente;
  public fotoPaciente: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public fotoRg: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public fotoCpf: string | ArrayBuffer = this.CAMINHO_IMAGEM_DUMMY;
  public showForm: boolean;
  private _filePaciente: File;
  private _fileRg: File;
  private _fileCpf: File;
  private _dadosLocalStorage: Valid;
  private _dataAtual: Date;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: PacienteService,
    private _dominioService: PacienteService,
    private _generoService: GeneroService,
    private _estadoCivilService: EstadoCivilService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._dadosLocalStorage = this._validService.getValid();
    // this._loading.emitChange(true);
    this.hideForm = false;

    this.pacienteForm = this._formBuilder.group({
      nome: [null, Validators.required],
      sobrenome: [null, [Validators.required, Validators.maxLength(60)]],
      cpf: [null, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [null, Validators.minLength(10)],
      rg: [null],
      rgEmissor: [null],
      rgDataEmissao: [null, [Validators.minLength(10), Validators.maxLength(10)]],
      genero: [null, Validators.required],
      estadoCivil: [null, Validators.required],
      fotoPaciente: [null, Validators.required],
      fotoRg: [null, Validators.required],
      fotoCpf: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.paciente = new Paciente();
    this._dataAtual = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1);
    this._generoService.listarGenero().pipe(
      map(response => this.generos = response.body.data),
      concatMap(() => this._estadoCivilService.listarEstadoCivil().pipe(map(response => this.estadosCivil = response.body.data))),
      // concatMap(() => this._service.pesquisarPacienteId(this._dadosLocalStorage.id))
    ).subscribe(dadosProfissional => {
      // this.paciente = dadosProfissional;
      console.log(this.generos);
      console.log(this.estadosCivil)
      this.popularForm();
      // if (this.paciente && this.paciente.fotoProfissional) {
      //   this.fotoProfissional = this.paciente.fotoProfissional;
      //   this.fileInputProfissional = 'fileinput-exists';
      // }
      // if (this.paciente && this.paciente.fotoRg) {
      //   this.fotoRg = this.paciente.fotoRg;
      //   this.fileInputRg = 'fileinput-exists';
      // }
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this.showForm = false;
        this._loading.emitChange(false);
      });
    });
    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });
  }

  popularForm() {
    if (this.paciente) {
      this.pacienteForm.patchValue({
        nome: '',
        sobrenome: '',
        cpf: '',
        dataNascimento: '',
        rg: '',
        rgEmissor: '',
        rgDataEmissao: '',
        genero: '',
        estadoCivil: '',
        fotoPaciente: '',
        fotoRg: '',
        fotoCpf: '',
      });
      this.pacienteForm.controls.fotoPaciente.setValue(this.paciente.foto, {emitModelToViewChange: false});
      this.pacienteForm.controls.fotoRg.setValue(this.paciente.fotoRg, {emitModelToViewChange: false});
      this.pacienteForm.controls.fotoCpf.setValue(this.paciente.fotoCpf, {emitModelToViewChange: false});
    }
  }

  onLoadFotoPaciente(event: any) {
    this._filePaciente = event.target.files[0];
    let reader = new FileReader();
    if (this._filePaciente) {
      reader.readAsDataURL(this._filePaciente);
      this.fileInputPaciente = this.FILEINPUT_EXISTS;
    }
    reader.onload = () => {
      this.fotoPaciente = reader.result;
    };
  }

  onLoadFotoRg(event: any) {
    this._fileRg = event.target.files[0];
    let reader = new FileReader();
    if (this._fileRg) {
      reader.readAsDataURL(this._fileRg);
      this.fileInputRg = this.FILEINPUT_EXISTS;
    }
    reader.onload = () => {
      this.fotoRg = reader.result;
    };
  }

  onLoadFotoCpf(event: any) {
    this._fileCpf = event.target.files[0];
    let reader = new FileReader();
    if (this._fileCpf) {
      reader.readAsDataURL(this._fileCpf);
      this.fileInputCpf = this.FILEINPUT_EXISTS;
    }
    reader.onload = () => {
      this.fotoCpf = reader.result;
    };
  }

  onSubmit() {
    console.log(this.pacienteForm.value);
    // this._loading.emitChange(true);
    // let profissional = this.pacienteForm.value;
    //
    // profissional.id = this._dadosLocalStorage.id;
    // profissional.fotoProfissional = this.fotoPaciente;
    // profissional.fotoRg = this.fotoRg;
    //
    // if (this.validacoes(profissional.rgDataEmissao, profissional.dataNascimento) && profissional.rg != null) {
    //   this._loading.emitChange(false);
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'A data de emissão do RG deve ser maior do que a data de nascimento',
    //     showConfirmButton: true,
    //   });
    //   return;
    // }
    //
    // if (this.validaIdade(profissional.dataNascimento)) {
    //   this._loading.emitChange(false);
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Necessário ter 18 anos ou mais para se cadastrar.',
    //     showConfirmButton: true,
    //   });
    //   return;
    // }
    //
    // if (profissional.rg != null && profissional.rg != '') {
    //   if (profissional.rgDataEmissao == null || profissional.rgDataEmissao == '') {
    //     this._loading.emitChange(false);
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'Data de emissão do RG obrigatória.',
    //       showConfirmButton: true,
    //     });
    //     return;
    //   }
    //   if (profissional.rgEmissor == null || profissional.rgEmissor == '') {
    //     this._loading.emitChange(false);
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'error',
    //       title: 'Emissor do RG obrigatório.',
    //       showConfirmButton: true,
    //     });
    //     return;
    //   }
    // }

    // this._service.save(profissional).subscribe(response => {
    //   this._dadosLocalStorage.id = response.body.profissionalId;
    //   setTimeout(() => {
    //     this._cadastro.profissional = profissional;
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: 'Alteração realizada com sucesso!',
    //       showConfirmButton: false,
    //       timer: 2000
    //     });
    //     this._router.navigateByUrl(`profissionais/${this._dadosLocalStorage.id}/dados-profissionais`);
    //     this._loading.emitChange(false);
    //   });
    // }, () => {
    //   this._loading.emitChange(false);
    //   Swal.fire({
    //     position: 'center',
    //     icon: 'error',
    //     title: 'Ocorreu um erro inexperado ao tentar alterar as informações do profissional',
    //     showConfirmButton: true
    //   });
    // });
  }

  validacoes(dataEmissao: string, dataNascimento: string) {
    if (new Date(dataEmissao) < new Date(dataNascimento)) {
      return true;
    }
  }

  validaIdade(dataNascimento: any) {
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
    } else if (mesAtual == mesNasc && new Date().getDate() < diaNasc) {
      idade--;
    }
    if (idade < 18) {
      return true;
    }
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function (event: any) {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

}
