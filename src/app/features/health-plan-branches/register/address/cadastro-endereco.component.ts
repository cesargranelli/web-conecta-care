import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnderecoPlanoSaudeFilial } from 'src/app/features/health-plan-branches/models/endereco-plano-saude-filial.model';
import { CadastroPlanosSaudeFilialService } from 'src/app/features/health-plan-branches/services/cadastro-planos-saude-filial.service';
import { EnderecoService } from 'src/app/features/health-plan-branches/services/endereco.service';
import { Valid } from 'src/app/core/models/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';
import { FormEnderecoComponent as FormEnderecoFilialComponent } from 'src/app/features/health-plan-branches/shared/components/forms/address/form-endereco.component';

declare var jQuery: any;

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, NgxMaskDirective, NgxMaskPipe, FormEnderecoFilialComponent],
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
    private _cadastro: CadastroPlanosSaudeFilialService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    if (this._cadastro.planoSaude?.id) {
      this._service.consultar(this._cadastro.planoSaude?.id).subscribe(response =>
        this._cadastro.endereco = response.body,
        (errorResponse: HttpErrorResponse) => {
          if (errorResponse.status === 404) {
            console.log('Não existem dados cadastrados!');
          }
        }
      );
    }
    this.isCadastro = true;
    this.linkBotaoVoltar = `planos-saude/${this.valid?.id}/register/filial`;
    this.labelBotaoSubmit = "Avançar";
  }

  onSubmit(endereco: EnderecoPlanoSaudeFilial) {
    this._loading.emitChange(true);
    endereco.idPlanoSaude = this._cadastro.planoSaude.id;
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

  private navigate(endereco: EnderecoPlanoSaudeFilial) {
    setTimeout(() => {
      this._cadastro.endereco = endereco;
      this._router.navigateByUrl(`planos-saude/${this.valid?.id}/register/filial/contato`);
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

