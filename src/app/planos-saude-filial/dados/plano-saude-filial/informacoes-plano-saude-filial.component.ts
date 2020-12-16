import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/plano-saude-filial.class';
import { CadastroPlanosSaudeFilialService } from 'src/app/planos-saude-filial/services/cadastro-planos-saude-filial.service';
import { PlanoSaudeFilialService } from 'src/app/planos-saude-filial/services/plano-saude-filial.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacoes-plano-saude-filial',
  templateUrl: './informacoes-plano-saude-filial.component.html',
  styleUrls: ['./informacoes-plano-saude-filial.component.css']
})
export class InformacoesPlanoSaudeFilialComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public cnpj: string;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: PlanoSaudeFilialService,
    private _router: Router,
    private _cadastro: CadastroPlanosSaudeFilialService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid.id).subscribe(response => {
      this._cadastro.planoSaude = response.body.data;
      this.cnpj = this._cadastro.planoSaude?.cnpj;
    },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!');
        }
      }
    );
    this.isCadastro = false;
    this.linkBotaoVoltar = `planos-saude-filial/${this.valid.id}/dados`;
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(planoSaude: PlanoSaudeFilial) {
    this._loading.emitChange(true);
    planoSaude.id = this.valid.id;
    planoSaude.cnpj = this.cnpj;
    this._service.alterar(planoSaude).subscribe(response => {
        setTimeout(() => {
          this._cadastro.planoSaude = planoSaude;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração realizada com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          this._router.navigateByUrl(`planos-saude-filial/${this.valid.id}/dados`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this.message();
      });
  }

  message() {
    this._loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir endereço',
      showConfirmButton: true
    });
  }

}
