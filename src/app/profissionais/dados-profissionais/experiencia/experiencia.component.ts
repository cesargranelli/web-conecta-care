import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Experiencia} from 'src/app/classes/experiencia.class';
import {Role} from 'src/app/enums/role.enum';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ExperienciaService} from 'src/app/services/experiencia.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();
  public experienciaForm: FormGroup;
  public experiencia1: Experiencia;
  public experiencia2: Experiencia;
  public experiencia3: Experiencia;
  public experiencias: Array<Experiencia>;
  public validationHas: InputValidationHas;
  public somenteLeitura: boolean = true;
  public showForm: boolean = true;
  private _dadosLocalStorage: Valid;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
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
      dataAdmissao1: [null, Validators.minLength(10)],
      dataDemissao1: [null, Validators.minLength(10)],
      empresa2: [null, Validators.maxLength(100)],
      cargo2: [null, Validators.maxLength(50)],
      dataAdmissao2: [null, Validators.minLength(10)],
      dataDemissao2: [null, Validators.minLength(10)],
      empresa3: [null, Validators.maxLength(100)],
      cargo3: [null, Validators.maxLength(50)],
      dataAdmissao3: [null, Validators.minLength(10)],
      dataDemissao3: [null, Validators.minLength(10)],
    });
  }

  ngOnInit(): void {
    this.experiencia1 = new Experiencia();
    this.experiencia2 = new Experiencia();
    this.experiencia3 = new Experiencia();
    this.validationHas = new InputValidationHas();
    this._dadosLocalStorage = this._validService.getValid();

    this._service.getDados(this._dadosLocalStorage.id).subscribe({
      next: experiencia => {
        this.experiencias = experiencia;
        this.popularForm();
        this.showForm = false;
        this._sharedLoadingService.emitChange(false);
      }
    });

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });
  }

  popularForm() {
    if (this.experiencias.length > 0) {
      if(this.experiencias[0].empresa != null && this.experiencias[0].empresa != '') {
        this.somenteLeitura = false;
        this.experienciaForm.patchValue({
          experiencia: true,
          observacao: this.experiencias[0].observacao,
        });
      }
      for (const experiencia of this.experiencias) {
        switch (experiencia.posicao) {
          case 1:
            this.experienciaForm.patchValue({
              empresa1: experiencia.empresa,
              cargo1: experiencia.cargo,
              dataAdmissao1: experiencia.dataAdmissao ? this.converterDataExibicao(experiencia.dataAdmissao.date) : null,
              dataDemissao1: experiencia.dataDemissao ? this.converterDataExibicao(experiencia.dataDemissao.date) : null
            });
            break;
          case 2:
            this.experienciaForm.patchValue({
              empresa2: experiencia.empresa,
              cargo2: experiencia.cargo,
              dataAdmissao2: experiencia.dataAdmissao ? this.converterDataExibicao(experiencia.dataAdmissao.date) : null,
              dataDemissao2: experiencia.dataDemissao ? this.converterDataExibicao(experiencia.dataDemissao.date) : null
            });
            break;
          case 3:
            this.experienciaForm.patchValue({
              empresa3: experiencia.empresa,
              cargo3: experiencia.cargo,
              dataAdmissao3: experiencia.dataAdmissao ? this.converterDataExibicao(experiencia.dataAdmissao.date) : null,
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
    this.experiencias = new Array<Experiencia>();
    debugger;
    if (this.validacoes()) {
      this._sharedLoadingService.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'As datas devem obedecer a ordem de precedência',
        showConfirmButton: true,
      });
      return;
    }

    if (this.experienciaForm.controls.experiencia.value) {
      if(this.experienciaForm.value.empresa1 == null || this.experienciaForm.value.empresa1 == '') {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Necessário incluir no mínimo uma empresa anterior ao marcar a opção de inclusão de experiências.',
          showConfirmButton: true,
        });
        return;
      }

      if(this.experienciaForm.value.cargo1 == null || this.experienciaForm.value.cargo1 == '') {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Necessário incluir no mínimo um cargo anterior ao marcar a opção de inclusão.',
          showConfirmButton: true,
        });
        return;
      }
    }

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
        this._router.navigateByUrl(`profissionais/${this._dadosLocalStorage.id}/dados-profissionais`, {
          state: {valid: this._dadosLocalStorage}
        });
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

  toogle() {
    this.somenteLeitura = this.experienciaForm.controls.experiencia.value;
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on('dp.change', function(event: any) {
      control.setValue(jQuery('#' + name)[0].value);
    });
  }

  validacoes(): boolean {
    const validaData1: boolean = this.validaPrecedencia(
      this.convertToDate(this.experienciaForm.controls.dataAdmissao1.value),
      this.convertToDate(this.experienciaForm.controls.dataDemissao1.value)
    );
    const validaData2: boolean = this.validaPrecedencia(
      this.convertToDate(this.experienciaForm.controls.dataAdmissao2.value),
      this.convertToDate(this.experienciaForm.controls.dataDemissao2.value)
    );
    const validaData3: boolean = this.validaPrecedencia(
      this.convertToDate(this.experienciaForm.controls.dataAdmissao3.value),
      this.convertToDate(this.experienciaForm.controls.dataDemissao3.value)
    );
    return !validaData1 || !validaData2 || !validaData3;
  }

  validaPrecedencia(dataMaisAntiga: Date, dataMaisRecente: Date): boolean {
    return dataMaisAntiga <= dataMaisRecente;
  }

  convertToDate(stringDate: string): Date {
    if (!!stringDate) {
      const arrayDate: string[] = stringDate.split('/').reverse();
      return new Date(Number(arrayDate[0]), Number(arrayDate[1]) - 1, Number(arrayDate[2]), 0, 0, 0);
    } else {
      return new Date();
    }
  }

}
