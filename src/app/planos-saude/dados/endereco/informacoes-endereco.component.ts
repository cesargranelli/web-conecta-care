import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EnderecoPlanoSaude } from 'src/app/planos-saude/classes/endereco-plano-saude.class';
import { CadastroPlanosSaudeService } from 'src/app/planos-saude/services/cadastro-planos-saude.service';
import { EnderecoService } from 'src/app/planos-saude/services/endereco.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacoes-endereco',
  templateUrl: './informacoes-endereco.component.html',
  styleUrls: ['./informacoes-endereco.component.css']
})
export class InformacoesEnderecoComponent implements OnInit {

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
    this._service.consultar(this.valid.id).subscribe(response =>
        this._cadastro.endereco = response.body.data,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!');
        }
      }
    );
    this.isCadastro = false;
    this.linkBotaoVoltar = `planos-saude/${this.valid.id}/dados`;
    this.labelBotaoSubmit = "Alterar";
  }

  onSubmit(endereco: EnderecoPlanoSaude) {
    this._loading.emitChange(true);
    endereco.idPlanoSaude = this.valid.id;
    this._service.alterar(endereco).subscribe(response => {
        setTimeout(() => {
          this._cadastro.endereco = endereco;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração realizada com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          this._router.navigateByUrl(`planos-saude/${this.valid.id}/dados`);
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
