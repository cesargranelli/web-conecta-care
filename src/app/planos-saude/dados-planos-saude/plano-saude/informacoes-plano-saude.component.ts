import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanoSaude } from 'src/app/planos-saude/classes/plano-saude.class';
import { CadastroPlanosSaudeService } from 'src/app/planos-saude/services/cadastro-planos-saude.service';
import { PlanoSaudeService } from 'src/app/planos-saude/services/plano-saude.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacoes-plano-saude',
  templateUrl: './informacoes-plano-saude.component.html',
  styleUrls: ['./informacoes-plano-saude.component.css']
})
export class InformacoesPlanoSaudeComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public cnpj: string;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: PlanoSaudeService,
    private _router: Router,
    private _cadastro: CadastroPlanosSaudeService
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
    this.linkBotaoVoltar = `planos-saude/${this.valid.id}/dados-planos-saude`;
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(planoSaude: PlanoSaude) {
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
          this._router.navigateByUrl(`planos-saude/${this.valid.id}/dados-planos-saude`);
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
