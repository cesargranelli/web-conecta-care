import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EstadoCivil} from 'src/app/classes/estado-civil.class';
import {Genero} from 'src/app/classes/genero.class';
import {Profissional} from 'src/app/classes/profissional.class';
import {TipoEmpresa} from 'src/app/classes/tipo-empresa.class';
import {Role} from 'src/app/enums/role.enum';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {DominioService} from 'src/app/services/dominio.service';
import {Valid} from 'src/app/services/feat/Valid';
import {ProfissionalService} from 'src/app/services/profissional.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {validCnpj} from 'src/app/shared/validations/directives/valid-cnpj.directive';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import {concatMap, map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css'],
})
export class InformacoesGeraisComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  public profissionalForm: FormGroup;

  public generos: Genero[];
  public tipoEmpresas: TipoEmpresa[];
  public estadoCivis: EstadoCivil[];

  public generoSelecionado: Genero;

  public fotoProfissional: any;
  public fotoRg: any;
  public valid: Valid;
  public validationHas: InputValidationHas = new InputValidationHas();
  public fileInputProfissional: string = 'fileinput-new';
  public fileInputRg: string = 'fileinput-new';
  public imagemFotoProfissional: string =
    '../../../../../assets/img/Headshot-Placeholder-1.png';
  public imagemFotoRg: string =
    '../../../../../assets/img/Headshot-Placeholder-1.png';
  public showForm: boolean = true;
  private _fileProfissional: File;
  private _fileRg: File;

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
      ctps: [null, [Validators.required]],
      ctpsSerie: [null, [Validators.required]],
      fotoProfissional: [null, [Validators.required]],
      fotoRg: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

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

    if (this._cadastro.profissional?.fotoProfissional) {
      this.fotoProfissional = this._cadastro.profissional?.fotoProfissional;
      this.imagemFotoProfissional = this._cadastro.profissional?.fotoProfissional;
      this.profissionalForm.controls.fotoProfissional.setValue(this._cadastro.profissional?.fotoProfissional, {emitModelToViewChange: false});
    }
    if (this._cadastro.profissional?.fotoRg) {
      this.fotoRg = this._cadastro.profissional?.fotoRg;
      this.imagemFotoRg = this._cadastro.profissional?.fotoRg;
      this.profissionalForm.controls.fotoRg.setValue(this._cadastro.profissional?.fotoRg, {emitModelToViewChange: false});
    }
  }

  onLoadFotoProfissional(event: any) {
    this._fileProfissional = event.target.files[0];
    var reader = new FileReader();
    if (this._fileProfissional) {
      reader.readAsDataURL(this._fileProfissional);
    }
    reader.onload = () => {
      this.fotoProfissional = reader.result;
    };
  }

  onLoadFotoRg(event: any) {
    this._fileRg = event.target.files[0];
    var reader = new FileReader();
    if (this._fileRg) {
      reader.readAsDataURL(this._fileRg);
    }
    reader.onload = () => {
      this.fotoRg = reader.result;
    };
  }

  onSubmit() {
    this._loading.emitChange(true);
    let profissional: Profissional = this.profissionalForm.value;
    profissional.id = this.valid.id;

    profissional.fotoProfissional = this.fotoProfissional;
    profissional.fotoRg = this.fotoRg;

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
    let valor = control.value.padStart(9, '0');
    this.profissionalForm.controls.rg.setValue(valor.toUpperCase());
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
