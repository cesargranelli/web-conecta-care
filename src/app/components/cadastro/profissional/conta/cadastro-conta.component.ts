import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, map } from 'rxjs/operators';
import { Banco } from 'src/app/classes/banco.class';
import { Conta } from 'src/app/classes/conta.class';
import { TipoConta } from 'src/app/classes/tipo-conta.class';
import { CadastroProfissionaisService } from 'src/app/services/cadastro-profissionais.service';
import { ContaService } from 'src/app/services/conta.service';
import { DominioService } from 'src/app/services/dominio.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-conta',
  templateUrl: './cadastro-conta.component.html',
  styleUrls: ['./cadastro-conta.component.css']
})
export class CadastroContaComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  contaForm: FormGroup;
  public tipoContas: TipoConta[];
  public bancos: Banco[];
  public validationHas: InputValidationHas = new InputValidationHas();
  public showForm: boolean = true;
  private valid: Valid;
  private conta: Conta = new Conta();

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _dominioService: DominioService,
    private _service: ContaService,
    private _loading: SharedLoadingService,
    private _cadastro: CadastroProfissionaisService
  ) {
    this.valid = this._validService.getValid();

    this.contaForm = this._formBuilder.group({
      tipo: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      agencia: [null, [Validators.required, Validators.maxLength(5)]],
      numero: [null, [Validators.required, Validators.maxLength(12)]],
      digito: [null, [Validators.required, Validators.maxLength(2)]],
      chave_pix_primaria: [null, [Validators.maxLength(100)]],
      chave_pix_secundaria: [null, [Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {
    this._dominioService.getTipoContas().pipe(
      map(response => {
        this._loading.emitChange(true);
        this.tipoContas = response.body;
      }),
      concatMap(() => this._dominioService.getBancos().pipe(
        map(response => {
          this.bancos = response.body;
        }))
      )
    ).subscribe(
      null,
      null,
      () => {
        setTimeout(() => {
          jQuery('select[id=\'tipoConta\']').selectpicker('refresh');
          jQuery(`select[id='tipoConta']`).selectpicker('val', this._cadastro.conta?.tipo.id);
          jQuery('select[id=\'banco\']').selectpicker('refresh');
          jQuery(`select[id='banco']`).selectpicker('val', this._cadastro.conta?.banco.id);
          this._loading.emitChange(false);
        });
        this.showForm = false;
      });

  }

  popularForm() {
    this.contaForm.patchValue({
      tipo: [this._cadastro.conta?.tipo, [Validators.required]],
      banco: ['', [Validators.required]],
      agencia: [this._cadastro.conta?.agencia, [Validators.required, Validators.maxLength(5)]],
      numero: [this._cadastro.conta?.numero, [Validators.required, Validators.maxLength(12)]],
      digito: [this._cadastro.conta?.digito, [Validators.required, Validators.maxLength(2)]],
      chave_pix_primaria: [this._cadastro.conta?.chave_pix_primaria, [Validators.maxLength(100)]],
      chave_pix_secundaria: [this._cadastro.conta?.chave_pix_secundaria, [Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this._loading.emitChange(true);
    this.conta = this.contaForm.value;

    // Inclu??do para corrigir os tipos Begin
    this.conta.tipo = this.tipoContas.filter(tipoConta => tipoConta.id == Number(this.conta.tipo))[0];
    this.conta.banco = this.bancos.filter(banco => banco.id == Number(this.conta.banco))[0];
    // Inclu??do para corrigir os tipos End

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
          // this._router.navigateByUrl(`profissionais/${this.valid.id}`);
          this._router.navigate([`./login`]);
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
    jQuery('.selectpicker').selectpicker('refresh');
  }

}
