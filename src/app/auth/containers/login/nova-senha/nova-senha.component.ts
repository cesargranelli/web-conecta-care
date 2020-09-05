import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navigation, Router } from '@angular/router';
import { NovaSenha } from 'src/app/classes/nova-senha';
import { Perfil } from 'src/app/classes/perfil';
import { Valid } from 'src/app/services/feat/Valid';
import { LoginService } from 'src/app/services/login.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validEqualsPassword } from 'src/app/shared/validations/directives/valid-equals';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.css']
})
export class NovaSenhaComponent implements OnInit {

  private _valid: Valid;

  @Output() loadingEvent = new EventEmitter<boolean>();
  public novaSenhaForm: FormGroup;
  public validation: InputValidation = new InputValidation();
  public validationHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _formBuilder: FormBuilder,
    private _service: LoginService,
    private _router: Router,
    private _loading: SharedLoadingService
  ) {
    const navigation: Navigation = this._router.getCurrentNavigation();
    this._valid = navigation.extras.state?.valid;
  }

  ngOnInit(): void {

    this.novaSenhaForm = this._formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$')
      ]],
      confirmarPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ]]
    }, { validators: validEqualsPassword });

  }

  onSubmit() {

    this._loading.emitChange(true);

    let novaSenha: NovaSenha = new NovaSenha(
      this.novaSenhaForm.value.password
    );

    this._service.novaSenha(novaSenha).subscribe(response => {
      setTimeout(() => {
        console.log(response.headers);
        this._loading.emitChange(false);
        let perfil = new Perfil(this._valid.role);
        this._router.navigateByUrl(`${perfil.getPerfil()}/${this._valid.id}`, {
          state: { valid: this._valid }
        });
      });
    }, (error: Error) => {
      console.log(error);
      this._loading.emitChange(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: error.message,
        showConfirmButton: true
      });
    });

  }

}
