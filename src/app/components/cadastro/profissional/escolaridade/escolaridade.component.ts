import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { Escolaridade } from 'src/app/classes/escolaridade.class';
import { Instrucao } from 'src/app/classes/instrucao.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { DominioService } from 'src/app/services/dominio.service';
import { EscolaridadeService } from 'src/app/services/escolaridade.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.css']
})
export class EscolaridadeComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  escolaridadeForm: FormGroup;

  private valid: Valid;
  private escolaridade: Escolaridade = new Escolaridade();

  public instrucoes: Instrucao[] = [];
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;
  public toogleEstado: boolean = true;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EscolaridadeService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.escolaridadeForm = this._formBuilder.group({
      instrucao: [null, [Validators.required]],
      instituicaoEnsino1: [null, [Validators.maxLength(50)]],
      anoConclusao1: [null, [Validators.maxLength(4)]],
      instituicaoEnsino2: [null, [Validators.maxLength(50)]],
      anoConclusao2: [null, [Validators.maxLength(4)]],
      instituicaoEnsino3: [null, [Validators.maxLength(50)]],
      anoConclusao3: [null, [Validators.maxLength(4)]],
    });
  }

  ngOnInit(): void {
    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    if (this._cadastro.experiencia?.length > 0) {
      this.escolaridadeForm.controls.instituicaoEnsino1.setValidators(Validators.required);
      this.escolaridadeForm.controls.anoConclusao1.setValidators(Validators.required);
    }

    this._dominioService.getInstrucoes().pipe(
      map(response => {
        this._loading.emitChange(true);
        this.instrucoes = response.body;
      })
    ).subscribe(
      null,
      null,
      () => {
      this.popularForm();
        setTimeout(() => {
          jQuery("select[id='instrucao']").selectpicker('refresh');
          jQuery("select[id='instrucao']").selectpicker('val', this._cadastro?.escolaridade?.instrucao.id);
          this._loading.emitChange(false);
        });
        this.showForm = false;
      });
  }

  popularForm() {
    this.escolaridadeForm.patchValue({
      instituicaoEnsino1: this._cadastro?.escolaridade?.instituicaoEnsino[0],
      anoConclusao1: this._cadastro?.escolaridade?.anoConclusao[0],
      instituicaoEnsino2: this._cadastro?.escolaridade?.instituicaoEnsino[1],
      anoConclusao2: this._cadastro?.escolaridade?.anoConclusao[1],
      instituicaoEnsino3: this._cadastro?.escolaridade?.instituicaoEnsino[2],
      anoConclusao3: this._cadastro?.escolaridade?.anoConclusao[2]
    });
  }

  onSubmit() {
    if (this.validacoes()) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Os anos de conclusão devem obedecer a ordem de precedência',
        showConfirmButton: true,
      });
      return;
    }

    this._loading.emitChange(true);

    // Incluído para corrigir os tipos Begin
    this.escolaridade.instrucao = this.instrucoes.filter(instrucao => instrucao.id == Number(this.escolaridadeForm.value.instrucao))[0];
    // Incluído para corrigir os tipos End

    this.escolaridade.instituicaoEnsino.push(this.escolaridadeForm.value.instituicaoEnsino1);
    this.escolaridade.instituicaoEnsino.push(this.escolaridadeForm.value.instituicaoEnsino2);
    this.escolaridade.instituicaoEnsino.push(this.escolaridadeForm.value.instituicaoEnsino3);

    this.escolaridade.anoConclusao.push(this.escolaridadeForm.value.anoConclusao1);
    this.escolaridade.anoConclusao.push(this.escolaridadeForm.value.anoConclusao2);
    this.escolaridade.anoConclusao.push(this.escolaridadeForm.value.anoConclusao3);

    this.escolaridade.proprietarioId = this.valid.id;

    this._service.save(this.escolaridade).subscribe(response => {
      setTimeout(() => {
        this._cadastro.escolaridade = this.escolaridade;
        this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/complemento`);
        this._loading.emitChange(false);
      });
    },
    (error: Error) => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir escolaridade',
        showConfirmButton: true
      });
    });
  }

  toogle() {
    this.toogleEstado = !this.escolaridadeForm.controls.instrucao.valid;
  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/experiencia`);
  }

  limpar() {
    this.escolaridadeForm.reset();
    jQuery(".selectpicker").selectpicker('refresh');
  }

  validacoes(): boolean {
    if (this.escolaridadeForm.controls.anoConclusao1.value &&
      this.escolaridadeForm.controls.anoConclusao2.value &&
      this.escolaridadeForm.controls.anoConclusao3.value) {
        return !(this.escolaridadeForm.controls.anoConclusao1.value <= this.escolaridadeForm.controls.anoConclusao2.value &&
        this.escolaridadeForm.controls.anoConclusao2.value <= this.escolaridadeForm.controls.anoConclusao3.value);
    }

    if (this.escolaridadeForm.controls.anoConclusao1.value && this.escolaridadeForm.controls.anoConclusao2.value) {
        return !(this.escolaridadeForm.controls.anoConclusao1.value <= this.escolaridadeForm.controls.anoConclusao2.value);
    }

    if (this.escolaridadeForm.controls.anoConclusao1.value && this.escolaridadeForm.controls.anoConclusao3.value) {
        return !(this.escolaridadeForm.controls.anoConclusao1.value <= this.escolaridadeForm.controls.anoConclusao3.value);
    }

    if (this.escolaridadeForm.controls.anoConclusao2.value && this.escolaridadeForm.controls.anoConclusao3.value) {
        return !(this.escolaridadeForm.controls.anoConclusao2.value <= this.escolaridadeForm.controls.anoConclusao3.value);
    }
  }

}
