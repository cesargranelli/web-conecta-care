import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Modulo} from 'src/app/classes/modulo.class';
import {DocumentoService} from 'src/app/services/documento.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {validCnpj} from 'src/app/shared/validations/directives/valid-cnpj.directive';
import {validCpf} from 'src/app/shared/validations/directives/valid-cpf.directive';
import {InputValidation} from 'src/app/shared/validations/input-validation';
import Swal from 'sweetalert2';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js
declare function hideToolTip(): void; //Carrega a funcao hideToolTip() do app.js
declare function injetaToolTip(): void; //Carrega a funcao injetaToolTip() do app.js

@Component({
  selector: 'app-cadastro-dependente-cpf',
  templateUrl: './cadastro-dependente-cpf.component.html',
  styleUrls: ['./cadastro-dependente-cpf.component.css'],
})
export class CadastroDependenteCpfComponent implements OnInit, OnDestroy {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public modulo: Modulo = new Modulo();

  public pacienteForm: FormGroup;
  public profissionalForm: FormGroup;
  public homecareForm: FormGroup;
  public planoSaudeForm: FormGroup;

  public cpfCnpjJaCadastrado = false;
  public input: InputValidation = new InputValidation();

  constructor(
    private _formBuilder: FormBuilder,
    private _documentoService: DocumentoService,
    private _router: Router,
    private _loading: SharedLoadingService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    this.pacienteForm = this._formBuilder.group({
      cpf: ['', [Validators.required, validCpf(true)]],
    });
    this.profissionalForm = this._formBuilder.group({
      cpf: ['', [Validators.required, validCpf(true)]],
    });
    this.homecareForm = this._formBuilder.group({
      cnpj: ['', [Validators.required, validCnpj(true)]],
    });
    this.planoSaudeForm = this._formBuilder.group({
      cnpj: ['', [Validators.required, validCnpj(true)]],
    });
    this.modulo.setModulo('pacientes');
    carregarTarjaAzul();
    injetaToolTip();
  }

  onSubmit(form: FormGroup, element: HTMLElement) {
    const numero: string = form.get(element.getAttribute('formControlName')).value;
    const tipo = "CPF";
    const modulo = "PACIENTE";
    this._loading.emitChange(true);
    this._documentoService.registrar({numero: numero, tipo: tipo, modulo: modulo}).subscribe(response => {
        this._loading.emitChange(false);
        if (response.body.data?.id) {
          this._router.navigateByUrl(`pacientes/${response.body.data?.id}/cadastro/informacoes-gerais`);
        } else {
          this.cpfCnpjJaCadastrado = true;
        }
      },
      httpResponse => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: httpResponse.error.data.message || httpResponse.error.data.error[0],
          showConfirmButton: true
        });
        this._loading.emitChange(false);
      });
  }

  setRole(perfil: string) {
    this.modulo = new Modulo(perfil);
  }

  ngOnDestroy() {
    hideToolTip();
  }

}
