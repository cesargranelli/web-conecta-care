import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NO_CONTENT } from 'http-status-codes';
import { ConvenioService } from 'src/app/services/convenio.service';
import { HomecareService } from 'src/app/services/homecare.service';
import { PacienteService } from 'src/app/services/paciente.service';
import { ProfissionalService } from 'src/app/services/profissional.service';
import { ValidadorCnpj } from '../../utils/validador-cnpj.utils';
import { ValidadorCpf } from '../../utils/validador-cpf.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  mascaraCpf: string = '000.000.000-00';
  mascaraCnpj: string = '00.000.000/0000-00';

  pacienteForm: FormGroup;
  profissionalForm: FormGroup;
  homecareForm: FormGroup;
  convenioForm: FormGroup;

  pacienteJaCadastrado: boolean = false;
  profissionalJaCadastrado: boolean = false;
  homecareJaCadastrada: boolean = false;
  convenioJaCadastrado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private validadorCpf: ValidadorCpf,
    private validadorCnpj: ValidadorCnpj,
    private pacienteService: PacienteService,
    private profissionalService: ProfissionalService,
    private homecareService: HomecareService,
    private convenioService: ConvenioService,
    private router: Router
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

    if (this.pacienteForm.value.cpf) {
      this.pacienteService.pesquisarCpf(this.pacienteForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {

        } else {
          this.pacienteJaCadastrado = true;
        }
      });
    }

    if (this.profissionalForm.value.cpf) {
      this.profissionalService.pesquisarCpf(this.profissionalForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {
          this.router.navigateByUrl('cadastro/profissional');
        } else {
          this.profissionalJaCadastrado = true;
        }
      });
    }

    if (this.homecareForm.value.cnpj) {
      this.homecareService.pesquisarCnpj(this.homecareForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {
        } else {
          this.homecareJaCadastrada = true;
        }
      });
    }

    if (this.convenioForm.value.cnpj) {
      this.convenioService.pesquisarCnpj(this.convenioForm.value).subscribe(response => {
        if (response.status===NO_CONTENT) {
          alert('Enviar para tela de cadastro de login');
        } else {
          this.convenioJaCadastrado = true;
        }
      });
    }

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
