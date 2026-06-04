import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/auth/services/login.service';
import { EsqueciMinhaSenha } from 'src/app/core/models/esqueci-senha';
import { Role } from 'src/app/core/enums/role.enum';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe],
  selector: 'pr-login',
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
          title: response.body?.message,
          showConfirmButton: true
        });
        this._router.navigateByUrl(`profissionais/${this.valid.id}/profile`);
        this._loading.emitChange(false);
      }, err => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error?.message,
          showConfirmButton: true
        });
        this._loading.emitChange(false);
      });
    });
  }

}

