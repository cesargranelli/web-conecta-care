import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedLoadingService } from '../../shared/services/shared-loading.service';
import { InputValidation } from '../../shared/validations/input-validation';
import { InputValidationHas } from '../../shared/validations/input-validation-has';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.css']
})
export class EsqueciMinhaSenhaComponent implements OnInit {

  public emailForm: FormGroup;

  public input: InputValidation = new InputValidation();
  public inputHas: InputValidationHas = new InputValidationHas();

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _sharedLoadingService: SharedLoadingService
  ) { }

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
    this._sharedLoadingService.emitChange(true);
    this._sharedLoadingService.emitChange(false);
  }

}
