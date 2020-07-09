import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EstadoCivil } from 'src/app/classes/estado-civil.class';
import { Genero } from 'src/app/classes/genero.class';
import { Profissional } from 'src/app/classes/profissional.class';
import { TipoEmpresa } from 'src/app/classes/tipo-empresa.class';
import { Role } from 'src/app/enums/role.enum';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public profissionalForm: FormGroup;

  public generos: Observable<Genero[]>;
  public tipoEmpresas: TipoEmpresa[];
  public estadoCivis: EstadoCivil[];

  public selectFile: File;
  public fotoProfissional: any;
  public fotoRg: any;
  public valid: Valid;
  public validationHas: InputValidationHas = new InputValidationHas();

  private _extensaoFotoProfissional: string;
  private _extensaoFotoRg: string;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _service: ProfissionalService,
    private _dominioService: DominioService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this.valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    this._sharedLoadingService.emitChange(true);

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      // this._router.navigateByUrl('/');
    }

    this.generos = this._dominioService.getGeneros();
    this._dominioService.getTipoEmpresas().subscribe(response => {
      this.tipoEmpresas = response.body;
    });
    this._dominioService.getEstadoCivis().subscribe(response => {
      this.estadoCivis = response.body;
    });

    this.profissionalForm = this._formBuilder.group({
      nome: [this._cadastro.profissional?.nome, [Validators.required]],
      sobrenome: [this._cadastro.profissional?.sobrenome, [Validators.required, Validators.maxLength(60)]],
      cpf: [this._cadastro.profissional?.cpf, [Validators.required, validCpf()]],
      dataNascimento: [this._cadastro.profissional?.dataNascimento, [Validators.required]],
      rg: [this._cadastro.profissional?.rg],
      rgEmissor: [this._cadastro.profissional?.rgEmissor],
      rgDataEmissao: [this._cadastro.profissional?.rgDataEmissao],
      pis: [this._cadastro.profissional?.pis],
      genero: ['', [Validators.required]],
      tipoEmpresa: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      cnpj: [this._cadastro.profissional?.cnpj, [Validators.required, validCnpj()]],
      ctps: [this._cadastro.profissional?.ctps, [Validators.required]],
      ctpsSerie: [this._cadastro.profissional?.ctpsSerie, [Validators.required]],
      fotoProfissional: ['', [Validators.required]],
      fotoRg: ['', [Validators.required]],
    });

    this._sharedLoadingService.emitChange(false);

  }

  onClick() {
    this.generos = this._dominioService.getGeneros();
    console.log(this.generos);
  }

  onLoadFotoProfissional(event:any) {
    const file: File = event.target.files[0];
    let type: string[] = file.type.split('/');
    this._extensaoFotoProfissional = type[1].padEnd(5, ' ');
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedProfissional.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedProfissional(e:any) {
    this.fotoProfissional = btoa(e.target.result);
  }

  onLoadFotoRg(event:any) {
    const file: File = event.target.files[0];
    let type: string[] = file.type.split('/');
    this._extensaoFotoRg = type[1].padEnd(5, ' ');
    if (file) {
      const reader = new FileReader();
      reader.onload = this.handlerReaderLoadedRg.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  handlerReaderLoadedRg(e:any) {
    this.fotoRg = btoa(e.target.result);
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    let profissional: Profissional = this.profissionalForm.value;

    profissional.fotoProfissional = this._extensaoFotoProfissional + this.fotoProfissional;

    profissional.fotoRg = this._extensaoFotoRg + this.fotoRg;

    this._service.save(profissional).subscribe(response => {
      this.valid.id = response.body.profissionalId;
      setTimeout(() => {
        this._cadastro.profissional = profissional;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/endereco`, {
          state: { valid: this.valid }
        });
        this._sharedLoadingService.emitChange(false);
      });
    },
    (error: Error) => {
      this._sharedLoadingService.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir profissional',
        showConfirmButton: true
      });
    });
  }

}
