import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EsqueciMinhaSenha} from 'src/app/classes/esqueci-senha';
import {LoginService} from 'src/app/services/login.service';
import {SharedLoadingService} from 'src/app/shared/services/shared-loading.service';
import {InputValidation} from 'src/app/shared/validations/input-validation';
import {InputValidationHas} from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manutencao-senha',
  templateUrl: './manutencao-senha.component.html',
  styleUrls: ['./manutencao-senha.component.css']
})
export class ManutencaoSenhaComponent implements OnInit {

  public emailForm: FormGroup;

  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  public cardTitle: string = 'Manutenção de senha';

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _loading: SharedLoadingService,
    private _service: LoginService
  ) {
  }

  ngOnInit(): void {
    this.emailForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]]
    });
  }

  onSubmit() {
    setTimeout(() => {
      this._loading.emitChange(true);
      let esqueciMinhaSenha: EsqueciMinhaSenha = new EsqueciMinhaSenha(this.emailForm.value.email);

      this._service.esqueciMinhaSenha(esqueciMinhaSenha).subscribe(response => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: response.body?.message,
          showConfirmButton: true
        });
      }, err => {
        this._loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error?.message,
          showConfirmButton: true
        });
      });
    });
  }

}
