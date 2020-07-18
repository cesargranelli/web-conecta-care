import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NO_CONTENT } from 'http-status-codes';
import { ConvenioService } from 'src/app/services/convenio.service';
import { HomecareService } from 'src/app/services/homecare.service';
import { DoumentoService } from 'src/app/services/interfaces/documento-interface.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedStatusPageService } from 'src/app/shared/services/shared-status-page.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import { InputValidation } from '../../shared/validations/input-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public pacienteForm: FormGroup;
  public profissionalForm: FormGroup;
  public homecareForm: FormGroup;
  public convenioForm: FormGroup;

  public pacienteJaCadastrado: boolean = false;
  public profissionalJaCadastrado: boolean = false;
  public homecareJaCadastrada: boolean = false;
  public convenioJaCadastrado: boolean = false;
  public input: InputValidation = new InputValidation();

  constructor(
    private _formBuilder: FormBuilder,
    @Inject('DoumentoService') private _documentoService: DoumentoService,
    private _pacienteService: PacienteService,
    private _homecareService: HomecareService,
    private _convenioService: ConvenioService,
    private _router: Router,
    private _sharedLoagingService: SharedLoadingService,
    private _status: SharedStatusPageService
  ) {}

  ngOnInit(): void {
    this.pacienteForm = this._formBuilder.group({
      cpf: ['', [Validators.required, validCpf()]],
    });
    this.profissionalForm = this._formBuilder.group({
      cpf: ['', [Validators.required, validCpf()]],
    });
    this.homecareForm = this._formBuilder.group({
      cnpj: ['', [Validators.required, validCnpj()]],
    });
    this.convenioForm = this._formBuilder.group({
      cnpj: ['', [Validators.required, validCnpj()]],
    });

    if (this._status.hasLoadControl()) {
      this._status.removeLoadControl();
      document.location.reload();
    }
  }

  onSubmit_(form: FormGroup) {
    this._sharedLoagingService.emitChange(true);
    this._documentoService.pesquisar(form.value).subscribe(response => {
      this._sharedLoagingService.emitChange(false);
      if (response.status===NO_CONTENT) {
        this._router.navigateByUrl('cadastro/login');
      } else {
        this.profissionalJaCadastrado = true;
      }
    }, error => this._sharedLoagingService.emitChange(false));
  }

  onSubmit() {

    if (this.pacienteForm.value.cpf) {
      this._pacienteService.pesquisarCpf(this.pacienteForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {

        } else {
          this.pacienteJaCadastrado = true;
        }
      });
    }

    if (this.homecareForm.value.cnpj) {
      this._homecareService.pesquisarCnpj(this.homecareForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {
        } else {
          this.homecareJaCadastrada = true;
        }
      });
    }

    if (this.convenioForm.value.cnpj) {
      this._convenioService.pesquisarCnpj(this.convenioForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {
          alert('Enviar para tela de cadastro de login');
        } else {
          this.convenioJaCadastrado = true;
        }
      });
    }

  }

  ngOnDestroy() {
    this._status.setLoadControl('load');
  }

}
