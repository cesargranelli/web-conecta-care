import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AreaAtendimento } from 'src/app/classes/area-atendimento.class';
import { ContatoPlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/contato-plano-saude-filial.class';
import { CadastroPlanosSaudeFilialService } from 'src/app/planos-saude-filial/services/cadastro-planos-saude-filial.service';
import { ContatoService } from 'src/app/planos-saude-filial/services/contato.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-contato-plano-saude-filial',
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
  public onSubmitEvent = new EventEmitter<ContatoPlanoSaudeFilial>();

  public valid: Valid;
  public contatoForm: FormGroup;
  public tipoDocumento: string;
  public validationHas: InputValidationHas;
  public especialidades: Array<AreaAtendimento>;
  public hideForm: boolean = true;

  private contato: ContatoPlanoSaudeFilial;

  constructor(
    private _validService: SharedValidService,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _formBuilder: FormBuilder,
    private _cadastro: CadastroPlanosSaudeFilialService,
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
    if (this._cadastro.planoSaude?.id) {
      this._service.consultar(this._cadastro.planoSaude.id).pipe(
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
    } else {
      setTimeout(() => {
        this._loading.emitChange(false);
        this.hideForm = false;
      });
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
