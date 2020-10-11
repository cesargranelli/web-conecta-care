import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AreaAtendimento} from 'src/app/classes/area-atendimento.class';
import {ContatoHomeCare} from 'src/app/classes/contatoHomeCare.class';
import {CadastroHomeCaresService} from 'src/app/services/cadastro-homecares.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {InputValidation} from '../../../../../shared/validations/input-validation';

@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class FormContatoComponent implements OnInit {

  @Input()
  public isAlteracao: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Output()
  public onSubmitEvent = new EventEmitter<ContatoHomeCare>();

  public contatoForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private contato: ContatoHomeCare;

  constructor(
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _cadastro: CadastroHomeCaresService
  ) {
    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      telefoneCelular: [null],
      telefoneWhatsapp: [null],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this._loading.emitChange(true);
    this.validationHas = new InputValidationHas();
    if (this._cadastro.contato?.email) {
      this.populaForm();
    }
    if (!this.isAlteracao) {
      this.contatoForm.get('flagAceiteDeclaracao').setValidators(Validators.required);
      this.contatoForm.get('flagAceitePrivacidade').setValidators(Validators.required);
    }
    this.hideForm = false;
    this._loading.emitChange(false);
  }

  populaForm() {
    this.contatoForm.patchValue({
      telefoneFixo: this._cadastro.contato?.telefoneFixo,
      telefoneRecado: this._cadastro.contato?.telefoneRecado,
      telefoneCelular: this._cadastro.contato?.telefoneCelular,
      telefoneWhatsapp: this._cadastro.contato?.telefoneWhatsapp,
      email: this._cadastro.contato?.email,
      flagAceiteDeclaracao: this._cadastro.contato?.flagAceiteDeclaracao,
      flagAceitePrivacidade: this._cadastro.contato?.flagAceitePrivacidade
    });
  }

  onReturn() {
    this._router.navigateByUrl(`${this.linkBotaoVoltar}`);
  }

  limparForm() {
    this.contatoForm.reset();
  }

  onSubmit() {
    this.contato = this.contatoForm.value;
    this._cadastro.contato = this.contato;
    this.onSubmitEvent.emit(this.contato);
  }

}
