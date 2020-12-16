import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContatoPlanoSaude} from '../../../../../planos-saude/classes/contato-plano-saude.class';
import {Valid} from '../../../../../services/feat/Valid';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InputValidationHas} from '../../../../../shared/validations/input-validation-has';
import {AreaAtendimento} from '../../../../../classes/area-atendimento.class';
import {SharedValidService} from '../../../../../shared/services/shared-valid.service';
import {Router} from '@angular/router';
import {SharedLoadingService} from '../../../../../shared/services/shared-loading.service';
import {CadastroPlanosSaudeService} from '../../../../../planos-saude/services/cadastro-planos-saude.service';
import {ContatoService} from '../../../../../planos-saude/services/contato.service';
import {map} from 'rxjs/internal/operators/map';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from "sweetalert2";

@Component({
  selector: 'app-form-contato-paciente',
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
  public onSubmitEvent = new EventEmitter<ContatoPlanoSaude>();

  public valid: Valid;
  public contatoForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private contato: ContatoPlanoSaude;

  constructor(
    private _validService: SharedValidService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _cadastro: CadastroPlanosSaudeService,
    private _service: ContatoService
  ) {
    this.valid = this._validService.getValid();
    this.contatoForm = this._formBuilder.group({
      telefoneFixo: [null, [Validators.required]],
      telefoneRecado: [null],
      telefoneCelular: [null],
      telefoneWhatsapp: [null],
      telefoneOuvidoria: [null, [Validators.required]],
      flagAceiteDeclaracao: [null],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      site: [null, [Validators.required]]
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
      telefoneOuvidoria: this._cadastro.contato?.telefoneOuvidoria,
      email: this._cadastro.contato?.email,
      site: this._cadastro.contato?.site,
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
    this.onSubmitEvent.emit(this.contato);
  }


}
