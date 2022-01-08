import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/enums/modulo.enum';
import { LoginService } from '../../../auth/services/login.service';
import { Valid } from '../../../services/feat/Valid';
import { SharedLoadingService } from '../../../shared/services/shared-loading.service';
import { SharedValidService } from '../../../shared/services/shared-valid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


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
    this.valid = this._validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: [{value: '', disabled: true}]
    });

    this._service.verLogin().subscribe(response => {
      this.loginForm.controls.email.setValue(response.body.data?.email);
      this._loading.emitChange(false);
    });

  }

  tooggle() {
    this.habilitarEdicao = !this.habilitarEdicao;
  }

  // onSubmit() {
  //   setTimeout(() => {
  //     this._loading.emitChange(true);
  //     let esqueciMinhaSenha: EsqueciMinhaSenha = new EsqueciMinhaSenha(this.loginForm.value.email);
  //
  //     this._service.esqueciMinhaSenha(esqueciMinhaSenha).subscribe(response => {
  //       this._loading.emitChange(false);
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'success',
  //         title: response.body.data?.message,
  //         showConfirmButton: true
  //       });
  //       this._router.navigateByUrl(`profissionais/${this.valid.id}/dados-profissionais`);
  //       this._loading.emitChange(false);
  //     }, err => {
  //       Swal.fire({
  //         position: 'center',
  //         icon: 'error',
  //         title: err.error.data?.message,
  //         showConfirmButton: true
  //       });
  //       this._loading.emitChange(false);
  //     });
  //   });
  // }


}
