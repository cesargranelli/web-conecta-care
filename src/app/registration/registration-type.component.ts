import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import Swal from 'sweetalert2';
import { Module } from 'src/app/classes/modulo.class';
import { DocumentoService } from 'src/app/services/documento.service';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { validCnpj } from 'src/app/shared/validations/directives/valid-cnpj.directive';
import { validCpf } from 'src/app/shared/validations/directives/valid-cpf.directive';
import { InputValidation } from 'src/app/shared/validations/input-validation';

declare var jQuery: any;
declare function carregarTarjaAzul(): void;
declare function hideToolTip(): void;
declare function injetaToolTip(): void;

@Component({
  selector: 'app-registration-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './registration-type.component.html',
  styleUrls: ['./registration-type.component.css'],
})
export class RegistrationTypeComponent implements OnInit, OnDestroy {

  private readonly fb = inject(FormBuilder);
  private readonly documentService = inject(DocumentoService);
  private readonly router = inject(Router);
  private readonly loading = inject(SharedLoadingService);

  readonly documentAlreadyRegistered = signal(false);

  module = new Module();
  patientForm!: FormGroup;
  professionalForm!: FormGroup;
  homecareForm!: FormGroup;
  healthPlanForm!: FormGroup;
  input = new InputValidation();

  constructor() {
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
  }

  ngOnInit(): void {
    this.patientForm = this.fb.group({ cpf: ['', [Validators.required, validCpf(true)]] });
    this.professionalForm = this.fb.group({ cpf: ['', [Validators.required, validCpf(true)]] });
    this.homecareForm = this.fb.group({ cnpj: ['', [Validators.required, validCnpj(true)]] });
    this.healthPlanForm = this.fb.group({ cnpj: ['', [Validators.required, validCnpj(true)]] });
    this.module.setModule('pacientes');
    carregarTarjaAzul();
    injetaToolTip();
  }

  onSubmit(form: FormGroup, el: HTMLElement): void {
    const number = form.get(el.getAttribute('formControlName')!)?.value as string;
    const type = el.getAttribute('formControlName')!.toUpperCase();
    const module = this.module.getModule();

    this.documentAlreadyRegistered.set(false);
    this.loading.emitChange(true);

    this.documentService.registrar({ numero: number, tipo: type, modulo: module }).subscribe({
      next: response => {
        this.loading.emitChange(false);
        if (response.body?.id) {
          this.router.navigateByUrl(`${this.module.getName()}/${response.body.id}/cadastro/login`);
        } else {
          this.documentAlreadyRegistered.set(true);
        }
      },
      error: err => {
        this.loading.emitChange(false);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.error?.message ?? err.error?.error?.[0] ?? 'Erro ao processar solicitação.',
          showConfirmButton: true
        });
      }
    });
  }

  setRole(profile: string): void {
    this.module = new Module(profile);
    this.documentAlreadyRegistered.set(false);
  }

  ngOnDestroy(): void {
    hideToolTip();
  }
}
