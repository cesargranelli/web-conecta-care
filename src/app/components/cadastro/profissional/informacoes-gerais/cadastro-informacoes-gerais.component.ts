import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { EstadoCivil } from 'src/app/classes/estado-civil.class';
import { Genero } from 'src/app/classes/genero.class';
import { Profissional } from 'src/app/classes/profissional.class';
import { TipoEmpresa } from 'src/app/classes/tipo-empresa.class';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './cadastro-informacoes-gerais.component.html',
  styleUrls: ['./cadastro-informacoes-gerais.component.css'],
})
export class CadastroInformacoesGeraisComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public profissionalForm: FormGroup;

  public generos: Genero[];
  public tipoEmpresas: TipoEmpresa[];
  public estadoCivis: EstadoCivil[];

  public generoSelecionado: Genero;

  public fotoCtps: any;
  public imagemFotoCtps: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputCtps: string = 'fileinput-new';
  public fileCtps: File;

  public fotoProfissional: any;
  public imagemFotoProfissional: string = '../../../../../assets/img/Headshot-Placeholder-1.png';
  public fileInputProfissional: string = 'fileinput-new';
  public fileProfissional: File;

  public fotoRgFrente: any;
  public imagemFotoRgFrente: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputRgFrente: string = 'fileinput-new';
  public fileRgFrente: File;

  public fotoRgVerso: any;
  public imagemFotoRgVerso: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputRgVerso: string = 'fileinput-new';
  public fileRgVerso: File;

  public fotoAssinatura: any;
  public imagemFotoAssinatura: string = '../../../../../assets/img/default-paisagem.png';
  public fileInputAssinatura: string = 'fileinput-new';
  public fileAssinatura: File;

  public valid: Valid;
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: ProfissionalService,
    private _dominioService: DominioService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.profissionalForm = this._formBuilder.group({
      nome: [null, [Validators.required]],
      sobrenome: [null, [Validators.required, Validators.maxLength(60)]],
      dataNascimento: [null, [Validators.required]],
      rg: [null],
      rgEmissor: [null],
      rgDataEmissao: [null],
      pis: [null],
      genero: [null, [Validators.required]],
      tipoEmpresa: [null, [Validators.required]],
      estadoCivil: [null, [Validators.required]],
      cnpj: [null, [validCnpj(false)]],
      ctps: [null, [Validators.required, Validators.maxLength(11)]],
      ctpsSerie: [null, [Validators.required]],
      fotoCtps: [null, [Validators.required]],
      fotoProfissional: [null, [Validators.required]],
      fotoRgFrente: [null, [Validators.required]],
      fotoRgVerso: [null, [Validators.required]],
      fotoAssinatura: [null, [Validators.required]],
      disponivelParaAtendimento: [false]
    });
  }

  ngOnInit(): void {
    this._dominioService.getGeneros().pipe(
      map((response) => {
        this._loading.emitChange(true);
        this.generos = response.body;
      }),
      concatMap(() => this._dominioService.getTipoEmpresas().pipe(
        map(response => {
          this.tipoEmpresas = response.body;
        }))
      ),
      concatMap(() => this._dominioService.getEstadoCivis().pipe(
        map(response => {
          this.estadoCivis = response.body;
        }))
      )
    ).subscribe(
      null,
      null,
      () => {
        this.popularForm();
        setTimeout(() => {
          jQuery(`select[id='genero']`).selectpicker('refresh');
          jQuery(`select[id='genero']`).selectpicker('val', this._cadastro.profissional?.genero);
          jQuery(`select[id='tipoEmpresa']`).selectpicker('refresh');
          jQuery(`select[id='tipoEmpresa']`).selectpicker('val', this._cadastro.profissional?.tipoEmpresa);
          jQuery('select[id=\'estadoCivil\']').selectpicker('refresh');
          jQuery(`select[id='estadoCivil']`).selectpicker('val', this._cadastro.profissional?.estadoCivil);
          this._loading.emitChange(false);
        });
        this.showForm = false;
      });

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });

    this._loading.emitChange(false);
  }

  popularForm() {
    this.profissionalForm.controls.nome.setValue(this._cadastro.profissional?.nome);
    this.profissionalForm.controls.sobrenome.setValue(this._cadastro.profissional?.sobrenome);
    this.profissionalForm.controls.dataNascimento.setValue(this._cadastro.profissional?.dataNascimento);
    this.profissionalForm.controls.rg.setValue(this._cadastro.profissional?.rg);
    this.profissionalForm.controls.rgEmissor.setValue(this._cadastro.profissional?.rgEmissor);
    this.profissionalForm.controls.rgDataEmissao.setValue(this._cadastro.profissional?.rgDataEmissao);
    this.profissionalForm.controls.pis.setValue(this._cadastro.profissional?.pis);
    this.profissionalForm.controls.cnpj.setValue(this._cadastro.profissional?.cnpj);
    this.profissionalForm.controls.ctps.setValue(this._cadastro.profissional?.ctps);
    this.profissionalForm.controls.ctpsSerie.setValue(this._cadastro.profissional?.ctpsSerie);
    this.profissionalForm.controls.disponivelParaAtendimento.setValue(this._cadastro.profissional?.disponivelParaAtendimento);

    if (this._cadastro.profissional?.fotoCtps) {
      this.fotoCtps = this._cadastro.profissional?.fotoCtps;
      this.imagemFotoCtps = this._cadastro.profissional?.fotoCtps;
      this.profissionalForm.controls.fotoCtps.setValue(this._cadastro.profissional?.fotoCtps, {emitModelToViewChange: false});
    }
    if (this._cadastro.profissional?.fotoProfissional) {
      this.fotoProfissional = this._cadastro.profissional?.fotoProfissional;
      this.imagemFotoProfissional = this._cadastro.profissional?.fotoProfissional;
      this.profissionalForm.controls.fotoProfissional.setValue(this._cadastro.profissional?.fotoProfissional, {emitModelToViewChange: false});
    }
    if (this._cadastro.profissional?.fotoRgFrente) {
      this.fotoRgFrente = this._cadastro.profissional?.fotoRgFrente;
      this.imagemFotoRgFrente = this._cadastro.profissional?.fotoRgFrente;
      this.profissionalForm.controls.fotoRgFrente.setValue(this._cadastro.profissional?.fotoRgFrente, {emitModelToViewChange: false});
    }
    if (this._cadastro.profissional?.fotoRgVerso) {
      this.fotoRgVerso = this._cadastro.profissional?.fotoRgVerso;
      this.imagemFotoRgVerso = this._cadastro.profissional?.fotoRgVerso;
      this.profissionalForm.controls.fotoRgVerso.setValue(this._cadastro.profissional?.fotoRgVerso, {emitModelToViewChange: false});
    }
    if (this._cadastro.profissional?.fotoAssinatura) {
      this.fotoAssinatura = this._cadastro.profissional?.fotoAssinatura;
      this.imagemFotoAssinatura = this._cadastro.profissional?.fotoAssinatura;
      this.profissionalForm.controls.fotoAssinatura.setValue(this._cadastro.profissional?.fotoAssinatura, {emitModelToViewChange: false});
    }
  }

  onLoadFotoCtps(event: any) {
    this.fileCtps = event.target.files[0];
    var reader = new FileReader();
    if (this.fileCtps) {
      reader.readAsDataURL(this.fileCtps);
    }
    reader.onload = () => {
      this.fotoCtps = reader.result;
    };
  }

  onLoadFotoProfissional(event: any) {
    this.fileProfissional = event.target.files[0];
    var reader = new FileReader();
    if (this.fileProfissional) {
      reader.readAsDataURL(this.fileProfissional);
    }
    reader.onload = () => {
      this.fotoProfissional = reader.result;
    };
  }

  onLoadFotoRgFrente(event: any) {
    this.fileRgFrente = event.target.files[0];
    var reader = new FileReader();
    if (this.fileRgFrente) {
      reader.readAsDataURL(this.fileRgFrente);
    }
    reader.onload = () => {
      this.fotoRgFrente = reader.result;
    };
  }

  onLoadFotoRgVerso(event: any) {
    this.fileRgVerso = event.target.files[0];
    var reader = new FileReader();
    if (this.fileRgVerso) {
      reader.readAsDataURL(this.fileRgVerso);
    }
    reader.onload = () => {
      this.fotoRgVerso = reader.result;
    };
  }

  onLoadFotoAssinatura(event: any) {
    this.fileAssinatura = event.target.files[0];
    var reader = new FileReader();
    if (this.fileAssinatura) {
      reader.readAsDataURL(this.fileAssinatura);
    }
    reader.onload = () => {
      this.fotoAssinatura = reader.result;
    };
  }

  onSubmit() {
    this._loading.emitChange(true);
    let profissional: Profissional = this.profissionalForm.value;
    profissional.id = this.valid?.id;

    profissional.fotoCtps = this.fotoCtps;
    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRgFrente = this.fotoRgFrente;
    profissional.fotoRgVerso = this.fotoRgVerso;
    profissional.fotoAssinatura = this.fotoAssinatura;

    if (this.validacoes(profissional.rgDataEmissao, profissional.dataNascimento)) {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'A data de emissão do RG deve ser maior do que a data de nascimento',
        showConfirmButton: true,
      });
      return;
    }

    this._service.save(profissional).subscribe(
      (response) => {
        this.valid.id = response.body.data.profissionalId;
        setTimeout(() => {
          this._cadastro.profissional = profissional;
          this._router.navigateByUrl(
            `cadastro/profissionais/${this.valid.id}/endereco`
          );
          this._loading.emitChange(false);
        });
      },
      (error: Error) => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir profissional',
          showConfirmButton: true,
        });
      }
    );
  }

  lpadZero(control: FormControl) {
    if (control.value) {
      let valor = control.value.padStart(9, '0');
      this.profissionalForm.controls.rg.setValue(valor.toUpperCase());
    }
  }

  limpar() {
    this.profissionalForm.reset();
    jQuery('.fileinput').fileinput('clear');
    jQuery('.selectpicker').selectpicker('refresh');
  }

  validacoes(dataEmissao: string, dataNascimento: string) {
    if (new Date(dataEmissao) < new Date(dataNascimento)) {
      return true;
    }
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function(event: any) {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

}
