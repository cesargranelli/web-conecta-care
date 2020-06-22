import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ValidadorCpf } from '../../../../utils/validador-cpf.utils';
import { ValidadorCnpj } from '../../../../utils/validador-cnpj.utils';

@Component({
  selector: 'app-informacoes-gerais',
  templateUrl: './informacoes-gerais.component.html',
  styleUrls: ['./informacoes-gerais.component.css']
})
export class InformacoesGeraisComponent implements OnInit {

  profissionalForm: FormGroup;

  mascaraCpf: string = '000.000.000-00';
  mascaraData: string = '00/00/0000';
  mascaraRg: string = '000.000.000-00';
  mascaraPIS: string = '000.0000.000-0';
  mascaraCnpj: string = '00.000.000/0000-00';

  constructor(
    private formBuilder: FormBuilder,
    private validadorCpf: ValidadorCpf,
    private validadorCnpj: ValidadorCnpj
  ) { }

  ngOnInit(): void {
    this.profissionalForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(40)]],
      sobrenome: ['', [Validators.required, Validators.maxLength(60)]],
      cpf: ['', [Validators.required, this.cpfValidator()]],
      dataNascimento: ['', [Validators.required]],
      rg: ['', []],
      rgEmissor: ['', [Validators.required]],
      rgDataEmissao: ['', [Validators.required]],
      pis: ['', []],
      genero: ['', [Validators.required]],
      tipoEmpresa: ['', [Validators.required]],
      estadoCivil: ['', [Validators.required]],
      cnpj: ['', [Validators.required, this.cnpjValidator()]],
      ctps: ['', [Validators.required]],
      ctpsSerie: ['', [Validators.required, this.cnpjValidator()]],
    });
  }

  onSubmit() {

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
