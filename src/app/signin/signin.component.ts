import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ValidadorCnpj } from '../utils/validador-cnpj.utils';
import { ValidadorCpf } from '../utils/validador-cpf.utils';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  mascaraCpf: string = '000.000.000-00';
  mascaraCnpj: string = '00.000.000/0000-00';

  pacienteForm: FormGroup;
  profissionalForm: FormGroup;
  homecareForm: FormGroup;
  convenioForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validadorCpf: ValidadorCpf,
    private validadorCnpj: ValidadorCnpj
  ) {}

  ngOnInit(): void {
    this.pacienteForm = this.formBuilder.group({
      cpf: ['', [Validators.required, this.cpfValidator()]],
    });
    this.profissionalForm = this.formBuilder.group({
      cpf: ['', [Validators.required, this.cpfValidator()]],
    });
    this.homecareForm = this.formBuilder.group({
      cnpj: ['', [Validators.required, this.cnpjValidator()]],
    });
    this.convenioForm = this.formBuilder.group({
      cnpj: ['', [Validators.required, this.cnpjValidator()]],
    });
  }

  onSubmit() {
    console.warn(this.pacienteForm.value.cpfPaciente);
  }

  cpfValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length != 11) {
        return { cpfInvalido: control.value };
      } else {
        if (!this.validadorCpf.validar(control.value)) {
          return { cpfInvalido: control.value };
        } else {
          return null;
        }
      }
    };
  }

  cnpjValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value.length != 14) {
        return { cnpjInvalido: control.value };
      } else {
        if (!this.validadorCnpj.validar(control.value)) {
          return { cnpjInvalido: control.value };
        } else {
          return null;
        }
      }
    };
  }

}
