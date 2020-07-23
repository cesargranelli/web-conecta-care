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
import { ValidService } from 'src/app/shared/services/shared-valid.service';

declare var jQuery: any;

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  contaForm: FormGroup;

  private valid: Valid;
  private conta: Conta = new Conta();

  public tipoContas: TipoConta[];
  public bancos: Banco[];
  public validationHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _router: Router,
    private _validService: ValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ContaService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {

    if (this?.valid?.role != Role.Profissional || !this?.valid?.role) {
      this._router.navigateByUrl('/');
    }

    this._dominioService.getTipoContas().subscribe(response => {
      this.tipoContas = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='tipoConta']").selectpicker('refresh');
      })
    });

    this._dominioService.getBancos().subscribe(response => {
      this.bancos = response.body
    }, null, () => {
      setTimeout(() => {
        jQuery("select[id='banco']").selectpicker('refresh');
      })
    });

    this.contaForm = this._formBuilder.group({
      tipo: [this._cadastro.conta?.tipo, [Validators.required]],
      banco: ['', [Validators.required]],
      agencia: [this._cadastro.conta?.agencia, [Validators.required, Validators.maxLength(5)]],
      numero: [this._cadastro.conta?.numero, [Validators.required, Validators.maxLength(12)]],
      digito: [this._cadastro.conta?.digito, [Validators.required, Validators.maxLength(2)]],
    });

  }

  onSubmit() {
    this._loading.emitChange(true);
    this.conta = this.contaForm.value;

    this.conta.proprietarioId = this.valid.id;

    this._service.save(this.conta).subscribe(response => {
      setTimeout(() => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cadastro realizado com sucesso!',
          showConfirmButton: false,
          timer: 2000
        });
        this._cadastro.conta = this.conta;
        this._router.navigateByUrl(`profissionais/${this.valid.id}`);
        this._loading.emitChange(false);
      });
    },
    (error: Error) => {
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ocorreu um erro inexperado ao tentar inserir conta',
        showConfirmButton: true
      });
    });

  }

  onReturn() {
    this._router.navigateByUrl(`cadastro/profissionais/${this.valid.id}/complemento`);
  }

  limpar() {
    this.contaForm.reset();
    jQuery(".selectpicker").selectpicker('refresh');
  }

}
