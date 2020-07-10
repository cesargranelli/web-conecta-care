import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedLoadingService } from '../shared/services/shared-loading.service';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { InputValidation } from '../shared/validations/input-validation';
import { InputValidationHas } from '../shared/validations/input-validation-has';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  public role: string = 'paciente';

  constructor(
    private _formBuilder: FormBuilder,
    private _service: UsuarioService,
    private _router: Router,
    private _sharedLoadingService: SharedLoadingService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern('^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$')
      ]]
    });
  }

  setRole(perfil: string) {
    this.role = perfil;
  }

  onSubmit() {
    this._sharedLoadingService.emitChange(true);
    this._sharedLoadingService.emitChange(false);
  }

}
