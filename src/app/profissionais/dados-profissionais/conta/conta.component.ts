import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Banco} from 'src/app/classes/banco.class';
import {Conta} from 'src/app/classes/conta.class';
import {TipoConta} from 'src/app/classes/tipo-conta.class';
import {CadastroProfissionaisService} from 'src/app/services/cadastro-profissionais.service';
import {ContaService} from 'src/app/services/conta.service';
import {DominioService} from 'src/app/services/dominio.service';
import {Valid} from 'src/app/services/feat/Valid';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import {ValidService} from '../../../shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import {concatMap, map} from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;

  public conta: Conta;
  public tipoContas: Array<TipoConta>;
  public bancos: Array<Banco>;
  public validationHas: InputValidationHas;
  public contaForm: FormGroup;
  public showForm: boolean = true;

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _validService: ValidService,
    private _service: ContaService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService,
    private _changeDetector: ChangeDetectorRef,
  ) {
    this._sharedLoadingService.emitChange(true);
    this.contaForm = this._formBuilder.group({
      tipo: [null, Validators.required],
      banco: [null, Validators.required],
      agencia: [null, [Validators.required, Validators.maxLength(5)]],
      numero: [null, [Validators.required, Validators.maxLength(12)]],
      digito: [null, [Validators.required, Validators.maxLength(2)]],
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dadosLocalStorage = this._validService.getValid();

    this._dominioService.getTipoContas().pipe(
      map(response => {
        this.tipoContas = response.body;
      }),
      concatMap(() => this._dominioService.getBancos().pipe(
        map(value => {
          this.bancos = value.body;
        }))
      ),
      concatMap(() => this._service.getDados(this._dadosLocalStorage.id))
    ).subscribe(dadosConta => {
      this.conta = dadosConta;
      this.popularForm();
      jQuery('select').selectpicker('render');
      setTimeout(() => {
        jQuery('select').selectpicker('refresh');
        this.showForm = false;
        this._sharedLoadingService.emitChange(false);
      });
    });
  }

  popularForm() {
    if (this.conta) {
      this.contaForm.patchValue({
        tipo: this.conta.tipo,
        banco: this.conta.banco,
        agencia: this.conta.agencia,
        numero: this.conta.numero,
        digito: this.conta.digito,
      });
    }
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this.conta = this.contaForm.value;
    this.conta.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this.conta).subscribe({
      complete: () => {
        setTimeout(() => {
          this._sharedLoadingService.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração realizada com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          this._cadastro.conta = this.conta;
          this._router.navigateByUrl(`profissionais/${this._dadosLocalStorage.id}`, {
            state: {valid: this._dadosLocalStorage}
          });
          this._sharedLoadingService.emitChange(false);
        });
      },
      error: () => {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar alterar os dados da conta',
          showConfirmButton: true
        });
      }
    });
  }

  limpar(): void {
    this.contaForm.reset();
    jQuery('select').selectpicker('refresh');
  }
}
