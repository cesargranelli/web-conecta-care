import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Escolaridade } from 'src/app/classes/escolaridade.class';
import { Instrucao } from 'src/app/classes/instrucao.class';
import { Role } from 'src/app/enums/role.enum';
import { DominioService } from 'src/app/services/dominio.service';
import { EscolaridadeService } from 'src/app/services/escolaridade.service';
import { Valid } from 'src/app/services/feat/Valid';
import Swal from 'sweetalert2';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';

@Component({
  selector: 'app-escolaridade',
  templateUrl: './escolaridade.component.html',
  styleUrls: ['./escolaridade.component.css']
})
export class EscolaridadeComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  escolaridadeForm: FormGroup;

  private _valid: Valid;
  private _escolaridade: Escolaridade = new Escolaridade();

  public instrucoes: Instrucao[] = [];
  public validationHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: EscolaridadeService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    // if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
    //   this._router.navigateByUrl('/');
    // }

    // this._dominioService.getInstrucoes().subscribe(response => {
    //   this.instrucoes = response.body
    // });

    this.escolaridadeForm = this._formBuilder.group({
      instrucao: ['', [Validators.required]],
      instituicaoEnsino1: ['', [Validators.maxLength(50)]],
      anoConclusao1: ['', [Validators.maxLength(4)]],
      instituicaoEnsino2: ['', [Validators.maxLength(50)]],
      anoConclusao2: ['', [Validators.maxLength(4)]],
      instituicaoEnsino3: ['', [Validators.maxLength(50)]],
      anoConclusao3: ['', [Validators.maxLength(4)]],
    });

  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this._escolaridade.instrucao = this.escolaridadeForm.value.instrucao;

    this._escolaridade.instituicaoEnsino.push(this.escolaridadeForm.value.instituicaoEnsino1);
    this._escolaridade.instituicaoEnsino.push(this.escolaridadeForm.value.instituicaoEnsino2);
    this._escolaridade.instituicaoEnsino.push(this.escolaridadeForm.value.instituicaoEnsino3);

    this._escolaridade.anoConclusao.push(this.escolaridadeForm.value.anoConclusao1);
    this._escolaridade.anoConclusao.push(this.escolaridadeForm.value.anoConclusao2);
    this._escolaridade.anoConclusao.push(this.escolaridadeForm.value.anoConclusao3);

    this._escolaridade.proprietarioId = this._valid.id;

    this._service.save(this._escolaridade).subscribe(response => {
      setTimeout(() => {
        this._cadastro.escolaridade = this._escolaridade;
        this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/complemento`, {
          state: { valid: this._valid }
        });
        this._sharedLoadingService.emitChange(false);
      });
    },
    (error: Error) => {
      this._sharedLoadingService.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir escolaridade',
        showConfirmButton: true
      });
    });

  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/experiencia`, {
      state: { valid: this._valid }
    });
  }

}
