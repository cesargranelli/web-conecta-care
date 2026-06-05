import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Valid } from 'src/app/core/models/Valid';
import Swal from 'sweetalert2';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { ContatoPaciente } from 'src/app/features/patients/models/contato-paciente.model';
import { ContatoService } from '../../services/contato.service';
import { FormContatoComponent } from 'src/app/features/patients/shared/components/forms/contact/form-contato.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormContatoComponent],
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public contatoFormGroup: FormGroup;
  public valid: Valid;

  constructor(private _validService: SharedValidService,
              private _loading: SharedLoadingService,
              private _service: ContatoService,
              private _router: Router,
  ) {
    this.valid = this._validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
    this.isCadastro = false;
    this.linkBotaoVoltar = '../';
    this.labelBotaoSubmit = 'Alterar';
  }
  
  onSubmit(contato: ContatoPaciente) {
    this._loading.emitChange(true);
    this._service.alterar(contato).subscribe(() => {
        setTimeout(() => {
          this._router.navigateByUrl(`pacientes/${this.valid.id}/dados`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        this.message();
      });
  }

  message() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}

