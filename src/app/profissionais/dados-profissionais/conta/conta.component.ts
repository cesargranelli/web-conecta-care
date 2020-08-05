import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
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
import {Subscription} from 'rxjs';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;
  private _serviceSubscription: Subscription;

  public conta: Conta;
  public tipoContas: Array<TipoConta>;
  public bancos: Array<Banco>;
  public validationHas: InputValidationHas;
  public contaForm: FormGroup;

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
    this.contaForm = this._formBuilder.group({
      tipo: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      agencia: [null, [Validators.required, Validators.maxLength(5)]],
      numero: [null, [Validators.required, Validators.maxLength(12)]],
      digito: [null, [Validators.required, Validators.maxLength(2)]],
    });
  }

  ngOnInit(): void {
    this.validationHas = new InputValidationHas();
    this._dadosLocalStorage = this._validService.getValid();
    this._serviceSubscription = this._service.getDados(this._dadosLocalStorage.id).subscribe(dadosConta => {
      this.conta = dadosConta;
      this.popularFormBuilder();
    });

    this._dominioService.getTipoContas().subscribe({
      next: (response) => {
        this.tipoContas = response.body;
      },
      complete: () => {
        setTimeout(() => {
          jQuery('select[id=\'tipo\']').selectpicker('refresh');
        });
      },
    });

    this._dominioService.getBancos().subscribe({
      next: (response) => {
        this.bancos = response.body;
      },
      complete: () => {
        setTimeout(() => {
          jQuery('select[id=\'banco\']').selectpicker('refresh');
        });
      },
    });
  }

  popularFormBuilder() {
    this.contaForm.patchValue({
      tipo: this.conta.tipo,
      banco: this.conta.banco,
      agencia: this.conta.agencia,
      numero: this.conta.numero,
      digito: this.conta.digito,
    });
  }

  //Atualiza selects
  ngAfterViewInit(): void {
    jQuery('.selectpicker').selectpicker('refresh');
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this.conta = this.contaForm.value;

    this.conta.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this.conta).subscribe(response => {
        setTimeout(() => {
          this._sharedLoadingService.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
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
      (error: Error) => {
        this._sharedLoadingService.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ocorreu um erro inexperado ao tentar inserir conta',
          showConfirmButton: true
        });
      });

  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this._dadosLocalStorage.id}/complemento`, {
      state: {valid: this._dadosLocalStorage}
    });
  }

  ngOnDestroy(): void {
    this._serviceSubscription.unsubscribe();
  }

}
