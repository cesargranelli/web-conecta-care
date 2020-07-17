import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { Banco } from 'src/app/classes/banco.class';
import { Conta } from 'src/app/classes/conta.class';
import { TipoConta } from 'src/app/classes/tipo-conta.class';
import { Role } from 'src/app/enums/role.enum';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ContaService } from 'src/app/services/conta.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  contaForm: FormGroup;

  private _valid: Valid;
  private _conta: Conta = new Conta();

  public tipoContas: TipoConta[];
  public bancos: Banco[];
  public validationHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ContaService,
    private _sharedLoadingService: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    // if (this?._valid?.role != Role.Profissional || !this?._valid?.role) {
    //   this._router.navigateByUrl('/');
    // }

    // this._dominioService.getTipoContas().subscribe(response => {
    //   this.tipoContas = response.body
    // });

    // this._dominioService.getBancos().subscribe(response => {
    //   this.bancos = response.body
    // });

    this.contaForm = this._formBuilder.group({
      tipo: [this._cadastro.conta?.tipo, [Validators.required]],
      banco: ['', [Validators.required]],
      agencia: [this._cadastro.conta?.agencia, [Validators.required, Validators.maxLength(5)]],
      numero: [this._cadastro.conta?.numero, [Validators.required, Validators.maxLength(12)]],
      digito: [this._cadastro.conta?.digito, [Validators.required, Validators.maxLength(2)]],
    });

  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this._conta = this.contaForm.value;

    this._conta.proprietarioId = this._valid.id;

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
        this._router.navigateByUrl(`profissionais/${this._valid.id}`, {
          state: { valid: this._valid }
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
    this._router.navigateByUrl(`cadastro/profissionais/${this._valid.id}/complemento`, {
      state: { valid: this._valid }
    });
  }

}
