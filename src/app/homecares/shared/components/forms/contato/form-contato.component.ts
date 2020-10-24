import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AreaAtendimento} from 'src/app/classes/area-atendimento.class';
import {ContatoHomeCare} from 'src/app/classes/contatoHomeCare.class';
import {CadastroHomeCaresService} from 'src/app/services/cadastro-homecares.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {ContatoService} from 'src/app/homecares/services/contato.service';
import {HttpErrorResponse} from '@angular/common/http';
import {SharedValidService} from 'src/app/shared/services/shared-valid.service';
import {Valid} from 'src/app/services/feat/Valid';
import {map} from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-form-contato',
  templateUrl: './form-contato.component.html',
  styleUrls: ['./form-contato.component.css']
})
export class FormContatoComponent implements OnInit {

  @Input()
  public isCadastro: boolean;

  @Input()
  public linkBotaoVoltar: string;

  @Input()
  public labelBotaoSubmit: string;

  @Output()
  public onSubmitEvent = new EventEmitter<ContatoHomeCare>();

  public valid: Valid;
  public contatoForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private contato: ContatoHomeCare;

  constructor(
    private _validService: SharedValidService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _cadastro: CadastroHomeCaresService,
    private _service: ContatoService
  ) {
    this.valid = this._validService.getValid();
    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null],
      telefoneRecado: [null],
      telefoneCelular: [null],
      telefoneWhatsapp: [null],
      flagAceiteDeclaracao: [null],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._service.consultar(this.valid.id).pipe(
      map(response => {
        this._cadastro.contato = response.body.data;
      })
    ).subscribe(null,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!');
        }
      },
      () => {
        if (this._cadastro.contato?.email) {
          this.populaForm();
        }
        setTimeout(() => {
          this._loading.emitChange(false);
          this.hideForm = false;
        });
      }
    );
    if (this.isCadastro) {
      this.contatoForm.get('flagAceiteDeclaracao').setValidators(Validators.requiredTrue);
    }
  }

  populaForm() {
    this.contatoForm.patchValue({
      telefoneFixo: this._cadastro.contato?.telefoneFixo,
      telefoneRecado: this._cadastro.contato?.telefoneRecado,
      telefoneCelular: this._cadastro.contato?.telefoneCelular,
      telefoneWhatsapp: this._cadastro.contato?.telefoneWhatsapp,
      email: this._cadastro.contato?.email,
      flagAceiteDeclaracao: this._cadastro.contato?.flagAceiteDeclaracao
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
