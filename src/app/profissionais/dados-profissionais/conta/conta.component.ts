import {ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import Swal from 'sweetalert2';
import {ValidService} from '../../../shared/services/shared-valid.service';
import {Subscription} from 'rxjs';

declare var jQuery: any;

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit, OnDestroy {
  @Output() loadingEvent = new EventEmitter<boolean>();

  private _dadosLocalStorage: Valid;

  private _conta: Conta;
  private _serviceSubscription: Subscription;
  public tipoContas: TipoConta[];

  public bancos: Banco[];
  public validationHas: InputValidationHas = new InputValidationHas();
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
  }

  ngOnInit(): void {
    // this.teste = "saopdsakdoas";
    this._dadosLocalStorage = this._validService.getValid();
    this.contaForm = this._formBuilder.group(new FormControl());
    this._serviceSubscription = this._service.getDados(this._dadosLocalStorage.id).subscribe(dadosConta => {
      this._conta = dadosConta;
      console.log(this._conta);
      this.popularFormBuilder();
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });

    // if (this?._dadosLocalStorage?.role != Role.Profissional || !this?._dadosLocalStorage?.role) {
    //   this._router.navigateByUrl('/');
    // }

    this._dominioService.getTipoContas().subscribe(response => {
      console.log(response.body);
      this.tipoContas = response.body;
    });

    // this._dominioService.getBancos().subscribe(response => {
    //   this.bancos = response.body
    // });
  }

  popularFormBuilder() {
    this.contaForm = this._formBuilder.group({
      tipo: [this._conta.tipo, [Validators.required]],
      banco: [null, [Validators.required]],
      agencia: [null, [Validators.required, Validators.maxLength(5)]],
      numero: [null, [Validators.required, Validators.maxLength(12)]],
      digito: [null, [Validators.required, Validators.maxLength(2)]],
    });
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this._conta = this.contaForm.value;

    this._conta.proprietarioId = this._dadosLocalStorage.id;

    this._service.save(this._conta).subscribe(response => {
        setTimeout(() => {
          this._sharedLoadingService.emitChange(false);
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cadastro realizado com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          this._cadastro.conta = this._conta;
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
