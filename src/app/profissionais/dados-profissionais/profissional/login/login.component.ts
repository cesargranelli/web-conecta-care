import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputValidation } from 'src/app/shared/validations/input-validation';
import { InputValidationHas } from 'src/app/shared/validations/input-validation-has';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _formBuilder: FormBuilder
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
        Validators.pattern('^.*((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*[0-9])((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$')
      ]]
    });
  }

  onSubmit() {

  }

}
