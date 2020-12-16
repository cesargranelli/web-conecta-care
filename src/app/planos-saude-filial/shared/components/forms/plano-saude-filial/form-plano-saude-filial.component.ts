import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap } from 'rxjs/internal/operators/concatMap';
import { map } from 'rxjs/internal/operators/map';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { PlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/plano-saude-filial.class';
import { CadastroPlanosSaudeFilialService } from 'src/app/planos-saude-filial/services/cadastro-planos-saude-filial.service';
import { PlanoSaudeFilialService } from 'src/app/planos-saude-filial/services/plano-saude-filial.service';
import { PlanoSaude } from 'src/app/planos-saude/classes/plano-saude.class';
import { DominioService } from 'src/app/services/dominio.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-form-plano-saude-filial',
  templateUrl: './form-plano-saude-filial.component.html',
  styleUrls: ['./form-plano-saude-filial.component.css']
})
export class FormPlanoSaudeFilialComponent implements OnInit {

  @Input()
  public isCadastro: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Input()
  public labelBotaoSubmit: string;

  @Output()
  public onSubmitEvent = new EventEmitter<PlanoSaudeFilial>();

  public planoSaudeForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public planosSaudeMatriz: Array<PlanoSaude>;
  public hideForm: boolean = true;

  private planoSaude: PlanoSaudeFilial;
  private readonly CNPJ: string = 'CNPJ';

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: PlanoSaudeFilialService,
    private _cadastro: CadastroPlanosSaudeFilialService
  ) {
    this.planoSaudeForm = this._formBuilder.group({
      nome: [null, Validators.required],
      planoSaudeMatriz: [null, Validators.required],
      tipoDocumento: [this.CNPJ, Validators.required],
      cnpj: [null, [Validators.required, validCnpj(true)]],
      anoFundacao: [null,  Validators.required],
      especialidade: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dominioService.getAreasAtendimento().pipe(
      map(response => {
        this.especialidades = response.body;
      }),
      concatMap(() => this._service.listarMatriz().pipe(
        map(response => {
          this.planosSaudeMatriz = response.body.data;
        }))
      ),
    ).subscribe(
      null,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 0) {
          console.log('Sistema indisponível! ' + errorResponse.statusText);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Sistema indisponível! ' + errorResponse.statusText,
            showConfirmButton: true
          });
        }
        this._loading.emitChange(false);
      },
      () => {
      if (this._cadastro.planoSaude?.id) {
        this.populaForm();
      } else {
        this.planoSaudeForm.patchValue({
          cnpj: this._cadastro.planoSaude.cnpj
        });
      }
      setTimeout(() => {
        jQuery(`select[id='especialidade']`).selectpicker('refresh');
        jQuery(`select[id='especialidade']`).selectpicker('val', this._cadastro.planoSaude?.especialidades);
        jQuery(`select[id='planoSaudeMatriz']`).selectpicker('refresh');
        jQuery(`select[id='planoSaudeMatriz']`).selectpicker('val', this._cadastro.planoSaude.planoSaudeMatriz?.id);
        this.carregarEspecialidades();
        this._loading.emitChange(false);
        this.hideForm = false;
      });
    });
  }

  populaForm() {
    this.planoSaudeForm.patchValue({
      nome: this._cadastro.planoSaude?.nome,
      planoSaudeMatriz: this._cadastro.planoSaude?.planoSaudeMatriz,
      tipoDocumento: this._cadastro.planoSaude?.tipoDocumento,
      cnpj: this._cadastro.planoSaude?.cnpj,
      anoFundacao: this._cadastro.planoSaude?.anoFundacao
    });
  }

  carregarEspecialidades(): void {
    if (this._cadastro.planoSaude?.especialidades) {
      let nomesEspecialidade: Array<string> = new Array<string>();
      for (const especialidadeKey of this._cadastro.planoSaude?.especialidades) {
        nomesEspecialidade.push(especialidadeKey.nome.toUpperCase());
      }
      this.planoSaudeForm.patchValue({
        especialidade: nomesEspecialidade
      });
      jQuery(`select[id='especialidade']`).val(nomesEspecialidade);
      jQuery(`select[id='especialidade']`).selectpicker('render');
    }
  }

  onReturn() {
    this._router.navigateByUrl(`${this.linkBotaoVoltar}`);
  }

  limparForm() {
    this.planoSaudeForm.reset();
    jQuery('select').selectpicker('render');
    setTimeout(() => {
      jQuery('select').selectpicker('refresh');
    });
  }

  onSubmit() {
    this.planoSaude = this.planoSaudeForm.value;
    this.planoSaude.especialidades = this.filtrarEspecialidades(this.planoSaudeForm);
    this.planoSaude.planoSaudeMatriz = this.filtrarPlanoSaudeMatriz(this.planoSaudeForm);
    this.onSubmitEvent.emit(this.planoSaude);
  }

  filtrarEspecialidades(planoSaudeForm: FormGroup): Array<AreaAtendimento> {
    let especialidades: Array<AreaAtendimento> = new Array<AreaAtendimento>();
    planoSaudeForm.controls.especialidade.value.forEach((area: any) => {
      especialidades.push(this.especialidades.filter(especialidade => especialidade.nome.toUpperCase() == area)[0]);
    });
    return especialidades;
  }

  filtrarPlanoSaudeMatriz(planoSaudeForm: FormGroup): PlanoSaude {
    return this.planosSaudeMatriz.filter(planoSaudeMatriz => planoSaudeMatriz.id == Number(planoSaudeForm.controls.planoSaudeMatriz.value))[0];
  }

}
