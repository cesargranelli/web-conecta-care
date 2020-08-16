import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Experiencia } from 'src/app/classes/experiencia.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  experienciaForm: FormGroup;

  private valid: Valid;
  private experiencia: Experiencia[] = [];

  public experiencia1: Experiencia = new Experiencia();
  public experiencia2: Experiencia = new Experiencia();
  public experiencia3: Experiencia = new Experiencia();
  public validationHas: InputValidationHas = new InputValidationHas();
  public toogleEstado: boolean = true;

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _service: ExperienciaService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.experienciaForm = this._formBuilder.group({
      experiencia: [null],
      observacao: [null],
      empresa1: [null, [Validators.maxLength(100)]],
      cargo1: [null, [Validators.maxLength(50)]],
      dataAdmissao1: [null],
      dataDemissao1: [null],
      empresa2: [null, [Validators.maxLength(100)]],
      cargo2: [null, [Validators.maxLength(50)]],
      dataAdmissao2: [null],
      dataDemissao2: [null],
      empresa3: [null, [Validators.maxLength(100)]],
      cargo3: [null, [Validators.maxLength(50)]],
      dataAdmissao3: [null],
      dataDemissao3: [null],
    });
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    if (this._cadastro?.experiencia) {
      this.popularForm();
    }

    jQuery('.datetimepicker').datetimepicker({
      format: 'DD/MM/YYYY',
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)
    });
  }

  popularForm() {
    this.experienciaForm.patchValue({
      empresa1: this._cadastro?.experiencia[0]?.empresa,
      cargo1: this._cadastro?.experiencia[0]?.cargo,
      dataAdmissao1: this._cadastro?.experiencia[0]?.dataAdmissao,
      dataDemissao1: this._cadastro?.experiencia[0]?.dataDemissao,
      empresa2: this._cadastro?.experiencia[1]?.empresa,
      cargo2: this._cadastro?.experiencia[1]?.cargo,
      dataAdmissao2: this._cadastro?.experiencia[1]?.dataAdmissao,
      dataDemissao2: this._cadastro?.experiencia[1]?.dataDemissao,
      empresa3: this._cadastro?.experiencia[2]?.empresa,
      cargo3: this._cadastro?.experiencia[2]?.cargo,
      dataAdmissao3: this._cadastro?.experiencia[2]?.dataAdmissao,
      dataDemissao3: this._cadastro?.experiencia[2]?.dataDemissao,
      observacao: this._cadastro?.experiencia[2]?.observacao
    });
  }

  onSubmit() {
    if (this.validacoes()) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'As datas devem obedecer a ordem de precedência',
        showConfirmButton: true,
      });
      return;
    }

    if (this.experienciaForm.value.experiencia) {

      this.experiencia1.posicao = 1;
      this.experiencia2.posicao = 2;
      this.experiencia3.posicao = 3;

      this.experiencia1.observacao = this.experienciaForm.controls.observacao.value;
      this.experiencia2.observacao = this.experienciaForm.controls.observacao.value;
      this.experiencia3.observacao = this.experienciaForm.controls.observacao.value;

      this.experiencia1.empresa = this.experienciaForm.controls.empresa1.value;
      this.experiencia2.empresa = this.experienciaForm.controls.empresa2.value;
      this.experiencia3.empresa = this.experienciaForm.controls.empresa3.value;

      this.experiencia1.cargo = this.experienciaForm.controls.cargo1.value;
      this.experiencia2.cargo = this.experienciaForm.controls.cargo2.value;
      this.experiencia3.cargo = this.experienciaForm.controls.cargo3.value;

      this.experiencia1.dataAdmissao = this.experienciaForm.controls.dataAdmissao1.value;
      this.experiencia2.dataAdmissao = this.experienciaForm.controls.dataAdmissao2.value;
      this.experiencia3.dataAdmissao = this.experienciaForm.controls.dataAdmissao3.value;

      this.experiencia1.dataDemissao = this.experienciaForm.controls.dataDemissao1.value;
      this.experiencia2.dataDemissao = this.experienciaForm.controls.dataDemissao2.value;
      this.experiencia3.dataDemissao = this.experienciaForm.controls.dataDemissao3.value;

      this.experiencia1.profissionalId = this.valid.id;
      this.experiencia2.profissionalId = this.valid.id;
      this.experiencia3.profissionalId = this.valid.id;

      this.experiencia.push(this.experiencia1);
      this.experiencia.push(this.experiencia2);
      this.experiencia.push(this.experiencia3);

      this._service.save(this.experiencia).subscribe(response => {
        this._loading.emitChange(true);
        setTimeout(() => {
          this._cadastro.experiencia = this.experiencia;
          this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/escolaridade`);
          this._loading.emitChange(false);
        });
      },
      (error: Error) => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir experiência profissional',
          showConfirmButton: true
        });
      });
    }

    setTimeout(() => {
      this._cadastro.experiencia = this.experiencia;
      this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/escolaridade`);
      this._loading.emitChange(false);
    });

  }

  toogle() {
    this.toogleEstado = this.experienciaForm.controls.experiencia.value;
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/carreira`);
  }

  dateChange(control: FormControl, name: string) {
    jQuery(`#${name}`).on("dp.change", function (event: any) {
      control.setValue(event?.date?._d?.toLocaleDateString());
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
