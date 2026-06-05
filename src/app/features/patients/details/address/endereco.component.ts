import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { EnderecoPaciente } from 'src/app/features/patients/models/endereco-paciente.model';
import { EnderecoService } from '../../services/endereco.service';
import { FormEnderecoComponent } from 'src/app/features/patients/shared/components/forms/address/form-endereco.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormEnderecoComponent],
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  public labelBotaoSubmit: string;
  public linkBotaoVoltar: string;
  public isCadastro = false;
  public onSubmitEvent = new EventEmitter<EnderecoPaciente>();
  public valid: Valid;

  constructor(private validService: SharedValidService,
    private loading: SharedLoadingService,
    private enderecoService: EnderecoService,
    private router: Router
  ) {
    this.valid = this.validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(enderecoPaciente: EnderecoPaciente) {
    this.loading.emitChange(true);
    this.enderecoService.alterar(enderecoPaciente).subscribe(() => {
      setTimeout(() => {
        this.router.navigateByUrl(`pacientes/${this.valid.id}/dados`);
        this.loading.emitChange(false);
      });
    },
      () => {
        this.loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar alterar os dados',
      showConfirmButton: true
    });
  }

}

