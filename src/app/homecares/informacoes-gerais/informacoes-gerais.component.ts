import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedLoadingService} from '../../shared/services/shared-loading.service';
import {InputValidationHas} from '../../shared/validations/input-validation-has';
import {DominioService} from '../../services/dominio.service';
import {AreaAtendimento} from '../../classes/area-atendimento.class';

declare var jQuery: any;


@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  public infoGeraisFormGroup: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public areasAtendimento: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private readonly CNPJ: string = 'CNPJ';

  constructor(
    private _loadingService: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService
  ) {
    this._loadingService.emitChange(true);
    this.infoGeraisFormGroup = this._formBuilder.group({
      nomeEmpresaHomeCare: [null, Validators.required],
      tipoDocumento: [this.CNPJ, Validators.required],
      numeroDocumento: [null, Validators.required],
      enderecoSite: [null],
      areasAtendimento: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dominioService.getAreasAtendimento().subscribe(
      areaAtendimento => {
        this.areasAtendimento = areaAtendimento.body;
        this._loadingService.emitChange(false);
        this.hideForm = false;
        jQuery('select').selectpicker('render');
        setTimeout(() => {
          jQuery('select').selectpicker('refresh');
        });
      }
    );
  }

  limparForm() {
    this.infoGeraisFormGroup.reset();
    this.infoGeraisFormGroup.patchValue({
      tipoDocumento: this.CNPJ
    });
    jQuery('select').selectpicker('render');
    setTimeout(() => {
      jQuery('select').selectpicker('refresh');
    });
  }


  onSubmit() {
    console.log(this.infoGeraisFormGroup.value);
  }

}
