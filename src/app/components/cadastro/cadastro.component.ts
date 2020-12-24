import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Role} from 'src/app/classes/role';
import {DocumentoService} from 'src/app/services/documento.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {validCnpj} from 'src/app/shared/validations/directives/valid-cnpj.directive';
import {validCpf} from 'src/app/shared/validations/directives/valid-cpf.directive';
import {InputValidation} from '../../shared/validations/input-validation';

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

  role: Role = new Role('pacientes');

  public pacienteForm: FormGroup;
  public profissionalForm: FormGroup;
  public homecareForm: FormGroup;
  public planoSaudeForm: FormGroup;

  public cpfCnpjJaCadastrado: boolean = false;
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

    carregarTarjaAzul();
    injetaToolTip();
  }

  onSubmit_(form: FormGroup, element: HTMLElement) {
    let numero: string = form.get(element.getAttribute('formControlName')).value;
    let tipo: string = element.getAttribute('formControlName');
    let perfil: string = this.role.getRole();
    this._loading.emitChange(true);
    this._documentoService.registrar({numero: numero, tipo: tipo, perfil: perfil}).subscribe(response => {
      this._loading.emitChange(false);
      if (response.body.data?.id != undefined) {
        this._router.navigateByUrl(`cadastro/login`, {
          state: {register: response.body.data}
        });
      } else {
        this.cpfCnpjJaCadastrado = true;
      }
    }, error => this._loading.emitChange(false));
  }

  onSubmit(form: FormGroup, element: HTMLElement) {
    let numero: string = form.get(element.getAttribute('formControlName')).value;
    let tipo: string = element.getAttribute('formControlName');
    let role: string = this.role.getRole();
    this._loading.emitChange(true);
    this._documentoService.registrar({numero: numero, tipo: tipo, perfil: role}).subscribe(response => {
      this._loading.emitChange(false);
      if (response.body.data?.id != undefined) {
        this._router.navigateByUrl(`${this.role.getPerfil()}/${response.body.data?.id}/cadastro/login`);
      } else {
        this.cpfCnpjJaCadastrado = true;
      }
    }, error => this._loading.emitChange(false));
  }

  setRole(perfil: string) {
    this.role = new Role(perfil);
  }

  ngOnDestroy() {
    hideToolTip();
  }

}
