import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedLoadingService} from '../../shared/services/shared-loading.service';
import {InputValidationHas} from '../../shared/validations/input-validation-has';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  public infoGeraisFormGroup: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;

  constructor(
    private _loadingService: SharedLoadingService,
    private _formBuilder: FormBuilder
  ) {
    this._loadingService.emitChange(true);
    this.infoGeraisFormGroup = this._formBuilder.group({
      nomeEmpresaHomeCare: [null, Validators.required],
      tipoDocumento: [null, Validators.required],
      numeroDocumento: [null, Validators.required],
      enderecoSite: [null],
      // areasAtendimento: [null, Validators.required]
      areasAtendimento: [null]
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    setTimeout(() => {
      this._loadingService.emitChange(false);
    });
  }

  popularForm() {
    // if (objetoPrincipal) {
    // this.infoGeraisFormGroup.patchValue({
    //   tipo: this.conta.tipo,
    //   banco: this.conta.banco,
    //   agencia: this.conta.agencia,
    //   numero: this.conta.numero,
    //   digito: this.conta.digito,
    // });
    // }
  }

  getSelectValue(event: string) {
    this.infoGeraisFormGroup.patchValue({
      tipoDocumento: event
    });
  }

  onSubmit() {
    console.log(this.infoGeraisFormGroup.value);
  }

}
