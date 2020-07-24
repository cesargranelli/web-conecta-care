import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Experiencia } from 'src/app/classes/experiencia.class';
import { Role } from 'src/app/enums/role.enum';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ValidService } from 'src/app/shared/services/shared-valid.service';

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

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _service: ExperienciaService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this.experienciaForm = this._formBuilder.group({
      experiencia: [false],
      observacao: [''],
      empresa1: ['', [Validators.maxLength(100)]],
      cargo1: ['', [Validators.maxLength(50)]],
      dataAdmissao1: [''],
      dataDemissao1: [''],
      empresa2: ['', [Validators.maxLength(100)]],
      cargo2: ['', [Validators.maxLength(50)]],
      dataAdmissao2: [''],
      dataDemissao2: [''],
      empresa3: ['', [Validators.maxLength(100)]],
      cargo3: ['', [Validators.maxLength(50)]],
      dataAdmissao3: [''],
      dataDemissao3: [''],
    });

  }

  onSubmit() {
    this._loading.emitChange(true);

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

      this.experiencia1.profissionalId = this.valid.id;
      this.experiencia2.profissionalId = this.valid.id;
      this.experiencia3.profissionalId = this.valid.id;

      this.experiencia.push(this.experiencia1);
      this.experiencia.push(this.experiencia2);
      this.experiencia.push(this.experiencia3);

      this._service.save(this.experiencia).subscribe(response => {
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

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/carreira`);
  }

}
