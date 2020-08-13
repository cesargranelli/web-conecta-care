import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Experiencia} from 'src/app/classes/experiencia.class';
import {Role} from 'src/app/enums/role.enum';
import {ExperienciaService} from 'src/app/services/experiencia.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ValidService} from '../../../shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;

  public experienciaForm: FormGroup;
  public experiencia1: Experiencia;
  public experiencia2: Experiencia;
  public experiencia3: Experiencia;
  public experiencias: Array<Experiencia>;
  public validationHas: InputValidationHas;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _service: ExperienciaService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this._sharedLoadingService.emitChange(true);
    this.experienciaForm = this._formBuilder.group({
      experiencia: [null],
      observacao: [null],
      empresa1: [null, Validators.maxLength(100)],
      cargo1: [null, Validators.maxLength(50)],
      dataAdmissao1: [null],
      dataDemissao1: [null],
      empresa2: [null, Validators.maxLength(100)],
      cargo2: [null, Validators.maxLength(50)],
      dataAdmissao2: [null],
      dataDemissao2: [null],
      empresa3: [null, Validators.maxLength(100)],
      cargo3: [null, Validators.maxLength(50)],
      dataAdmissao3: [null],
      dataDemissao3: [null],
    });
  }

  ngOnInit(): void {
    this.experiencia1 = new Experiencia();
    this.experiencia2 = new Experiencia();
    this.experiencia3 = new Experiencia();
    this.validationHas = new InputValidationHas();
    this._dadosLocalStorage = this._validService.getValid();

    if (this?._dadosLocalStorage?.role != Role.Profissional || !this?._dadosLocalStorage?.role) {
      this._router.navigateByUrl('/');
    }

    this._service.getDados(this._dadosLocalStorage.id).subscribe({
      next: experiencia => {
        this.experiencias = experiencia;
        this.popularForm();
        this._sharedLoadingService.emitChange(false);
      }
    });

  }

  popularForm() {
    if (this.experiencias.length > 0) {
      this.experienciaForm.patchValue({
        experiencia: true,
        observacao: this.experiencias[0].observacao,
      });
      for (const experiencia of this.experiencias) {
        switch (experiencia.posicao) {
          case 1:
            this.experienciaForm.patchValue({
              empresa1: experiencia.empresa,
              cargo1: experiencia.cargo,
              dataAdmissao1: experiencia.dataAdmissao.date ? this.converterDataExibicao(experiencia.dataAdmissao.date) : null,
              dataDemissao1: experiencia.dataDemissao ? this.converterDataExibicao(experiencia.dataDemissao.date) : null
            });
            break;
          case 2:
            this.experienciaForm.patchValue({
              empresa2: experiencia.empresa,
              cargo2: experiencia.cargo,
              dataAdmissao2: experiencia.dataAdmissao.date ? this.converterDataExibicao(experiencia.dataAdmissao.date) : null,
              dataDemissao2: experiencia.dataDemissao ? this.converterDataExibicao(experiencia.dataDemissao.date) : null
            });
            break;
          case 3:
            this.experienciaForm.patchValue({
              empresa3: experiencia.empresa,
              cargo3: experiencia.cargo,
              dataAdmissao3: experiencia.dataAdmissao.date ? this.converterDataExibicao(experiencia.dataAdmissao.date) : null,
              dataDemissao3: experiencia.dataDemissao ? this.converterDataExibicao(experiencia.dataDemissao.date) : null
            });
            break;
        }
      }
    }

  }

  converterDataExibicao(data: string): string {
    let dia: string = data.slice(8, 10);
    let mes: string = data.slice(5, 7);
    let ano: string = data.slice(0, 4);
    return dia + '/' + mes + '/' + ano;
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);

    if (this.experienciaForm.value.experiencia) {

      this.experiencia1.posicao = 1;
      this.experiencia2.posicao = 2;
      this.experiencia3.posicao = 3;

      this.experiencia1.observacao = this.experienciaForm.value.observacao;
      this.experiencia2.observacao = this.experienciaForm.value.observacao;
      this.experiencia3.observacao = this.experienciaForm.value.observacao;

      this.experiencia1.empresa = this.experienciaForm.value.empresa1;
      this.experiencia2.empresa = this.experienciaForm.value.empresa2;
      this.experiencia3.empresa = this.experienciaForm.value.empresa3;

      this.experiencia1.cargo = this.experienciaForm.value.cargo1;
      this.experiencia2.cargo = this.experienciaForm.value.cargo2;
      this.experiencia3.cargo = this.experienciaForm.value.cargo3;

      this.experiencia1.dataAdmissao = this.experienciaForm.value.dataAdmissao1;
      this.experiencia2.dataAdmissao = this.experienciaForm.value.dataAdmissao2;
      this.experiencia3.dataAdmissao = this.experienciaForm.value.dataAdmissao3;

      this.experiencia1.dataDemissao = this.experienciaForm.value.dataDemissao1;
      this.experiencia2.dataDemissao = this.experienciaForm.value.dataDemissao2;
      this.experiencia3.dataDemissao = this.experienciaForm.value.dataDemissao3;

      this.experiencia1.profissionalId = this._dadosLocalStorage.id;
      this.experiencia2.profissionalId = this._dadosLocalStorage.id;
      this.experiencia3.profissionalId = this._dadosLocalStorage.id;

      this.experiencias.push(this.experiencia1);
      this.experiencias.push(this.experiencia2);
      this.experiencias.push(this.experiencia3);

      this._service.save(this.experiencias).subscribe(response => {
        setTimeout(() => {
          this._cadastro.experiencia = this.experiencias;
          this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/escolaridade`);
          this._sharedLoadingService.emitChange(false);
        });
      }, () => {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir experiência profissional',
          showConfirmButton: true
        });
      });

    }

    setTimeout(() => {
      this._cadastro.experiencia = this.experiencias;
      this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/escolaridade`);
      this._loading.emitChange(false);
    });

  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/carreira`);
  }

}
