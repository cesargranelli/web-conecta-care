import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/core/enums/modulo.enum';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import { EnderecoPaciente } from 'src/app/features/patients/models/endereco-paciente.model';
import { EnderecoService } from '../../services/endereco.service';
import { FormEnderecoComponent } from 'src/app/features/patients/shared/components/forms/address/form-endereco.component';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormEnderecoComponent],
  selector: 'app-endereco',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  public _dadosLocalStorage: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: EnderecoService,
    private _router: Router
  ) {
    this._loading.emitChange(true);
    this._dadosLocalStorage = this._validService.getValid(Modulo.Paciente);
  }

  ngOnInit(): void {
    // this._service.consultar(this.valid.id).subscribe(response =>
    //     this._cadastro.endereco = response.body.data,
    //   (errorResponse: HttpErrorResponse) => {
    //     if (errorResponse.status === 404) {
    //       console.log('Não existem dados cadastrados!');
    //     }
    //   }
    // );
    this.isCadastro = true;
    this.linkBotaoVoltar = `pacientes/${this._dadosLocalStorage.id}/register/informacoes-gerais`;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(endereco: EnderecoPaciente) {
    this._loading.emitChange(true);
    // endereco.idPaciente = this._dadosLocalStorage.id;
    this._service.pesquisarEnderecoPorId(endereco?.id ? endereco?.id : 0)
      .subscribe((enderecoCallback: EnderecoPaciente) => {
        if (enderecoCallback) {
          this._service.alterar(endereco).subscribe(enderecoAtualizado => {
            setTimeout(() => {
              this._router.navigateByUrl(`pacientes/${this._dadosLocalStorage.id}/register/contato`);
              this._loading.emitChange(false);
            });
          });
        } else {
          this._service.cadastrar(endereco).subscribe(() => {
            setTimeout(() => {
              this._router.navigateByUrl(`pacientes/${this._dadosLocalStorage.id}/register/contato`);
              this._loading.emitChange(false);
            });
          });
        }
      }, () => {
        this._service.cadastrar(endereco).subscribe(() => {
          setTimeout(() => {
            this._router.navigateByUrl(`pacientes/${this._dadosLocalStorage.id}/register/contato`);
            this._loading.emitChange(false);
          });
        });
      });
  }

}

