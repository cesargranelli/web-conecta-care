import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/models/modulo.class';
import { DocumentoService } from 'src/app/services/documento.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import Swal from 'sweetalert2';

declare var jQuery: any;

declare function carregarTarjaAzul(): void; //Carrega a funcao carregarTarjaAzul() do app.js
declare function hideToolTip(): void; //Carrega a funcao hideToolTip() do app.js
declare function injetaToolTip(): void; //Carrega a funcao injetaToolTip() do app.js

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit, OnDestroy {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public modulo: Modulo = new Modulo();

  public pacienteForm: FormGroup;
  public profissionalForm: FormGroup;
  public homecareForm: FormGroup;
  public planoSaudeForm: FormGroup;

  public formSubmitted: FormGroup;

  public cpfCnpjJaCadastrado = false;
  public input: InputValidation = new InputValidation();

  constructor(
    private formBuilder: FormBuilder,
    private documentoService: DocumentoService,
    private router: Router,
    private loading: SharedLoadingService
  ) {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    this.formSubmitted = this.formBuilder.group({
      documento: ['', [Validators.required, validCpf(true)]],
      modulo: [this.modulo, []],
    });

    this.pacienteForm = this.formBuilder.group({
      cpf: ['', [Validators.required, validCpf(true)]],
    });
    this.profissionalForm = this.formBuilder.group({
      cpf: ['', [Validators.required, validCpf(true)]],
    });
    this.homecareForm = this.formBuilder.group({
      cnpj: ['', [Validators.required, validCnpj(true)]],
    });
    this.planoSaudeForm = this.formBuilder.group({
      cnpj: ['', [Validators.required, validCnpj(true)]],
    });
    this.modulo.setModulo('pacientes');
    carregarTarjaAzul();
    injetaToolTip();
  }

  onSubmit(form: FormGroup, element: HTMLElement) {
    const numero: string = form.get(element.getAttribute('formControlName')).value;
    const tipo: string = element.getAttribute('formControlName').toUpperCase();
    const modulo: string = this.modulo.getModulo();
    this.loading.emitChange(true);
    this.documentoService.registro({ numero: numero, tipo: tipo, modulo: modulo }).subscribe(response => {
      this.loading.emitChange(false);
      console.log(response);
      if (response?.id) {
        this.router.navigateByUrl(`${this.modulo.getNome()}/${response?.id}/cadastro/login`);
      } else if (response !== undefined && response.id === undefined) {
        this.cpfCnpjJaCadastrado = true;
      } else {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Erro ao processar o cadastro. Tente novamente mais tarde.',
          showConfirmButton: true
        });
      }
    });
  }

  onSubmitTest(form: FormGroup) {
    const documento: string = form.controls.documento.value;
    console.log(form);
    console.log(documento);
  }

  setModulo(perfil: string) {
    this.modulo.setModulo(perfil);
    console.log(this.modulo);
  }

  ngOnDestroy() {
    hideToolTip();
  }

}
