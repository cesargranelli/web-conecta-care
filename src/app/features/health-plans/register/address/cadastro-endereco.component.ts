import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnderecoPlanoSaude } from 'src/app/features/health-plans/models/endereco-plano-saude.model';
import { CadastroPlanosSaudeService } from 'src/app/features/health-plans/services/cadastro-planos-saude.service';
import { EnderecoService } from 'src/app/features/health-plans/services/endereco.service';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { FormEnderecoComponent } from 'src/app/features/health-plans/shared/components/forms/address/form-endereco.component';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormEnderecoComponent],
  selector: 'app-cadastro-endereco-plano-saude',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: EnderecoService,
    private _router: Router,
    private _cadastro: CadastroPlanosSaudeService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid?.id).subscribe(response =>
      this._cadastro.endereco = response.body,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!');
        }
      }
    );
    this.isCadastro = true;
    this.linkBotaoVoltar = `planos-saude/${this.valid.id}/register/plano-saude`;
    this.labelBotaoSubmit = "Avançar";
  }

  onSubmit(endereco: EnderecoPlanoSaude) {
    this._loading.emitChange(true);
    endereco.idPlanoSaude = this.valid.id;
    if (!this._cadastro.endereco.id) {
      this._service.cadastrar(endereco).subscribe(response => {
          this.navigate(endereco);
        },
        () => {
          this.message();
        });
    } else {
      this._service.alterar(endereco).subscribe(response => {
          this.navigate(endereco);
        },
        () => {
          this.message();
        });
    }
  }

  private navigate(endereco: EnderecoPlanoSaude) {
    setTimeout(() => {
      this._cadastro.endereco = endereco;
      this._router.navigateByUrl(`planos-saude/${this.valid.id}/register/contato`);
      this._loading.emitChange(false);
    });
  }

  private message() {
    this._loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}

