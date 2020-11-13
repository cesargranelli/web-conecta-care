import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { PlanoSaude } from 'src/app/classes/plano-saude.class';
import { CadastroPlanosSaudeService } from 'src/app/services/cadastro-planos-saude.service';
import { DominioService } from 'src/app/services/dominio.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

declare var jQuery: any;

@Component({
  selector: 'app-form-plano-saude',
  templateUrl: './form-plano-saude.component.html',
  styleUrls: ['./form-plano-saude.component.css']
})
export class FormPlanoSaudeComponent implements OnInit {

  @Input()
  public isCadastro: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Input()
  public labelBotaoSubmit: string;

  @Output()
  public onSubmitEvent = new EventEmitter<PlanoSaude>();

  public planoSaudeForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private planoSaude: PlanoSaude;
  private readonly CNPJ: string = 'CNPJ';

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _cadastro: CadastroPlanosSaudeService
  ) {
    this.planoSaudeForm = this._formBuilder.group({
      nome: [null, Validators.required],
      tipoDocumento: [this.CNPJ, Validators.required],
      cnpj: [null, Validators.required],
      site: [null],
      especialidade: [null, Validators.required]
    });
    this.planoSaudeForm.controls.cnpj.disable();
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dominioService.getAreasAtendimento().pipe(
      map(response => {
        this.especialidades = response.body;
      })
    ).subscribe(null, null, () => {
      if (this._cadastro.planoSaude?.id) {
        this.populaForm();
      } else {
        this.planoSaudeForm.patchValue({
          cnpj: this._cadastro.planoSaude?.cnpj
        });
      }
      setTimeout(() => {
        jQuery(`select[id='especialidade']`).selectpicker('refresh');
        jQuery(`select[id='especialidade']`).selectpicker('val', this._cadastro.planoSaude?.especialidades);
        this.carregarEspecialidades();
        this._loading.emitChange(false);
        this.hideForm = false;
      });
    });
  }

  populaForm() {
    this.planoSaudeForm.patchValue({
      nome: this._cadastro.planoSaude?.nome,
      tipoDocumento: this._cadastro.planoSaude?.tipoDocumento,
      cnpj: this._cadastro.planoSaude?.cnpj,
      site: this._cadastro.planoSaude?.site
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
    this.planoSaudeForm.patchValue({
      tipoDocumento: this.CNPJ
    });
    jQuery('select').selectpicker('render');
    setTimeout(() => {
      jQuery('select').selectpicker('refresh');
    });
  }

  onSubmit() {
    this.planoSaude = this.planoSaudeForm.value;
    this.planoSaude.especialidades = this.filtrarEspecialidades(this.planoSaudeForm);
    this._cadastro.planoSaude = this.planoSaude;
    this.onSubmitEvent.emit(this.planoSaude);
  }

  filtrarEspecialidades(planoSaudeForm: FormGroup): Array<AreaAtendimento> {
    let especialidades: Array<AreaAtendimento> = new Array<AreaAtendimento>();
    planoSaudeForm.controls.especialidade.value.forEach((area: any) => {
      especialidades.push(this.especialidades.filter(especialidade => especialidade.nome.toUpperCase() == area)[0]);
    });
    return especialidades;
  }

}
