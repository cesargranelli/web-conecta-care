import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Modulo } from 'src/app/classes/modulo';
import { PlanoSaudeFilial } from 'src/app/planos-saude-filial/classes/plano-saude-filial.class';
import { CadastroPlanosSaudeFilialService } from 'src/app/planos-saude-filial/services/cadastro-planos-saude-filial.service';
import { PlanoSaudeFilialService } from 'src/app/planos-saude-filial/services/plano-saude-filial.service';
import { DocumentoService } from 'src/app/services/documento.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-plano-saude-filial',
  templateUrl: './cadastro-plano-saude-filial.component.html',
  styleUrls: ['./cadastro-plano-saude-filial.component.css']
})
export class CadastroPlanoSaudeFilialComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: PlanoSaudeFilialService,
    private _serviceDocumento: DocumentoService,
    private _router: Router,
    private _cadastro: CadastroPlanosSaudeFilialService
  ) {
    this._loading.emitChange(true);
    jQuery('html').removeClass('nav-open');
    jQuery('button').removeClass('toggled');
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this._cadastro.planoSaude.id).subscribe(response =>
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
    this.linkBotaoVoltar = `planos-saude/${this.valid.id}`;
    this.labelBotaoSubmit = 'Avançar';
  }

  onSubmit(planoSaude: PlanoSaudeFilial) {
    let id = this._cadastro.planoSaude.id;
    this._cadastro.planoSaude = planoSaude;
    this._cadastro.planoSaude.id = id;

    this._loading.emitChange(true);
    let numero: string = planoSaude.cnpj;
    let tipo: string = planoSaude.tipoDocumento;
    let modulo: Modulo = new Modulo('planos-saude-filial');

    if (!this._cadastro.planoSaude.id) {
      this._serviceDocumento.registrar({numero: numero, tipo: tipo, modulo: modulo.getModulo()}).subscribe(response => {
        this._loading.emitChange(false);
        if (response.body.data?.id) {
          this._cadastro.planoSaude.id = response.body.data.id;

          this._service.cadastrar(this._cadastro.planoSaude).subscribe(response => {
            this.navigate();
          }, () => {
            this.message();
          });

        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'CNPJ já cadastrado! informe outro número válido de CNPJ!',
            showConfirmButton: true
          });
        }
      }, error => {
        this.message();
      });
    } else {
      this._service.alterar(this._cadastro.planoSaude).subscribe(response => {
        this.navigate();
      }, () => {
        this.message();
      });
    }
  }

  private navigate() {
    setTimeout(() => {
      this._router.navigateByUrl(`planos-saude/${this.valid.id}/cadastro/filial/endereco`);
      this._loading.emitChange(false);
    });
  }

  private message() {
    this._loading.emitChange(false);
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Ocorreu um erro inexperado ao tentar inserir plano de saúde filial',
      showConfirmButton: true
    });
  }

}
