import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PlanoSaude } from 'src/app/planos-saude/classes/plano-saude.class';
import { CadastroPlanosSaudeService } from 'src/app/planos-saude/services/cadastro-planos-saude.service';
import { PlanoSaudeService } from 'src/app/planos-saude/services/plano-saude.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastro-plano-saude',
  templateUrl: './cadastro-plano-saude.component.html',
  styleUrls: ['./cadastro-plano-saude.component.css']
})
export class CadastroPlanoSaudeComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: PlanoSaudeService,
    private _serviceDocumento: DocumentoService,
    private _router: Router,
    private _cadastro: CadastroPlanosSaudeService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
    this._serviceDocumento.pesquisar(this.valid?.id).subscribe(response => {
      this._cadastro.planoSaude.cnpj = response.body.data.documento;
    },
    (errorResponse: HttpErrorResponse) => {
      if (errorResponse.status === 404) {
        console.log('Documento não cadastrado!');
      } else if (errorResponse.status === 0) {
        console.log(errorResponse.statusText);
      }
    });
  }

  ngOnInit(): void {
    this._service.consultar(this.valid?.id).subscribe(response =>
        this._cadastro.planoSaude = response.body.data,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Plano de Saúde não cadastrado!');
        } else if (errorResponse.status === 0) {
          console.log(errorResponse.statusText);
        }
      }
    );
    this.isCadastro = true;
    this.linkBotaoVoltar = null;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(planoSaude: PlanoSaude) {
    this._loading.emitChange(true);
    planoSaude.id = this.valid.id;
    if (!this._cadastro.planoSaude.id) {
      this._service.cadastrar(planoSaude).subscribe(response => {
        this._cadastro.planoSaude = planoSaude;
        this.navigate(planoSaude);
      },
      () => {
        this.message();
      });
    } else {
      this._service.alterar(planoSaude).subscribe(response => {
          this.navigate(planoSaude);
        },
        () => {
          this.message();
        });
    }
  }

  private navigate(planoSaude: PlanoSaude) {
    setTimeout(() => {
      this._cadastro.planoSaude = planoSaude;
      this._router.navigateByUrl(`planos-saude/${this.valid.id}/cadastro/endereco`);
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
