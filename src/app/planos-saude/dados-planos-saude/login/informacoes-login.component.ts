import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from 'src/app/auth/services/login.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import Swal from 'sweetalert2';
import { Valid } from 'src/app/services/feat/Valid';
import { Router } from '@angular/router';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { EsqueciMinhaSenha } from 'src/app/classes/esqueci-senha';

@Component({
  selector: 'pr-login',
  templateUrl: './informacoes-login.component.html',
  styleUrls: ['./informacoes-login.component.css']
})
export class InformacoesLoginComponent implements OnInit {

  @Output() loadingEvent = new EventEmitter<boolean>();

  public loginForm: FormGroup;
  public habilitarEdicao: boolean = false;
  private valid: Valid;

  constructor(
    private _router: Router,
    private _validService: SharedValidService,
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _loading: SharedLoadingService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [{value: '', disabled: true}]
    });

    this._service.verLogin().subscribe(response => {
      this.loginForm.controls.email.setValue(response.body?.email);
      this._loading.emitChange(false);
    });
  }

  tooggle() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  onSubmit() {
    setTimeout(() => {
      this._loading.emitChange(true);
      let esqueciMinhaSenha: EsqueciMinhaSenha = new EsqueciMinhaSenha(this.loginForm.value.email);

      this._service.esqueciMinhaSenha(esqueciMinhaSenha).subscribe(response => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.body.data?.message,
          showConfirmButton: true
        });
        this._router.navigateByUrl(`planos-saude/${this.valid.id}/dados-planos-saude`);
        this._loading.emitChange(false);
      }, err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error.data?.message,
          showConfirmButton: true
        });
        this._loading.emitChange(false);
      });
    });
  }

}
