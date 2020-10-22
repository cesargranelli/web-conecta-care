import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { HomeCare } from 'src/app/classes/homecare.class';
import { CadastroHomeCaresService } from 'src/app/services/cadastro-homecares.service';
import { DominioService } from 'src/app/services/dominio.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

declare var jQuery: any;

@Component({
  selector: 'app-form-homecare',
  templateUrl: './form-homecare.component.html',
  styleUrls: ['./form-homecare.component.css']
})
export class FormHomeCareComponent implements OnInit {

  @Input()
  public isAlteracao: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Output()
  public onSubmitEvent = new EventEmitter<HomeCare>();

  public homeCareForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private homeCare: HomeCare;
  private readonly CNPJ: string = 'CNPJ';

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _cadastro: CadastroHomeCaresService
  ) {
    this.homeCareForm = this._formBuilder.group({
      nome: [null, Validators.required],
      tipoDocumento: [this.CNPJ, Validators.required],
      cnpj: [null, Validators.required],
      site: [null],
      especialidade: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dominioService.getAreasAtendimento().pipe(
      map(response => {
        this.especialidades = response.body;
      })
    ).subscribe(null, null, () => {
      if (this._cadastro.homeCare?.id) {
        this.populaForm();
      }
      setTimeout(() => {
        jQuery(`select[id='especialidade']`).selectpicker('refresh');
        jQuery(`select[id='especialidade']`).selectpicker('val', this._cadastro.homeCare?.especialidades);
        this.carregarEspecialidades();
        this._loading.emitChange(false);
        this.hideForm = false;
      });
    });
  }

  populaForm() {
    this.homeCareForm.patchValue({
      nome: this._cadastro.homeCare?.nome,
      tipoDocumento: this._cadastro.homeCare?.tipoDocumento,
      cnpj: this._cadastro.homeCare?.cnpj,
      site: this._cadastro.homeCare?.site
    });
  }

  carregarEspecialidades(): void {
    if (this._cadastro.homeCare?.especialidades) {
      let nomesEspecialidade: Array<string> = new Array<string>();
      for (const especialidadeKey of this._cadastro.homeCare?.especialidades) {
        nomesEspecialidade.push(especialidadeKey.nome.toUpperCase());
      }
      this.homeCareForm.patchValue({
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
    this.homeCareForm.reset();
    this.homeCareForm.patchValue({
      tipoDocumento: this.CNPJ
    });
    jQuery('select').selectpicker('render');
    setTimeout(() => {
      jQuery('select').selectpicker('refresh');
    });
  }

  onSubmit() {
    this.homeCare = this.homeCareForm.value;
    this.homeCare.especialidades = this.filtrarEspecialidades(this.homeCareForm);
    this._cadastro.homeCare = this.homeCare;
    this.onSubmitEvent.emit(this.homeCare);
  }

  filtrarEspecialidades(homeCareForm: FormGroup): Array<AreaAtendimento> {
    let especialidades: Array<AreaAtendimento> = new Array<AreaAtendimento>();
    homeCareForm.controls.especialidade.value.forEach((area: any) => {
      especialidades.push(this.especialidades.filter(especialidade => especialidade.nome.toUpperCase() == area)[0]);
    });
    return especialidades;
  }

}
