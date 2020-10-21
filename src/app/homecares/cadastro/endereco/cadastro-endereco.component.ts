import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Endereco } from 'src/app/classes/endereco.class';
import { EnderecoService } from 'src/app/homecares/services/endereco.service';
import { CadastroHomeCaresService } from 'src/app/services/cadastro-homecares.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

declare var jQuery: any;

@Component({
  selector: 'app-cadastro-endereco-homecare',
  templateUrl: './cadastro-endereco.component.html',
  styleUrls: ['./cadastro-endereco.component.css']
})
export class CadastroEnderecoComponent implements OnInit {

  public valid: Valid;
  public linkBotaoVoltar: string;
  public nomeBotaoSubmit: string;
  public formularioCadastro: boolean;
  public onSubmitEvent = new EventEmitter<FormGroup>();

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: EnderecoService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid.id).subscribe(response =>
      this._cadastro.endereco = response.body.data,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!')
        }
      }
    );
    this.linkBotaoVoltar = `homecares/${this.valid.id}/cadastro/homecare`;
    this.nomeBotaoSubmit = 'Avançar';
    this.formularioCadastro = true;
  }

  onSubmit(endereco: Endereco) {
    this._loading.emitChange(true);
    endereco.proprietarioId = this.valid.id;
    if (!this._cadastro.endereco) {
      this._service.cadastrar(endereco).subscribe(response => {
        setTimeout(() => {
          this._cadastro.endereco = endereco;
          this._router.navigateByUrl(`homecares/${this.valid.id}/cadastro/contato`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        this.message();
      });
    } else {
      this._service.alterar(endereco).subscribe(response => {
        setTimeout(() => {
          this._cadastro.endereco = endereco;
          this._router.navigateByUrl(`homecares/${this.valid.id}/cadastro/contato`);
          this._loading.emitChange(false);
        });
      },
      () => {
        this._loading.emitChange(false);
        this.message();
      });
    }
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
