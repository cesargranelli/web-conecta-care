import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeCare } from 'src/app/homecares/classes/homecare.class';
import { HomecareService } from 'src/app/homecares/services/homecare.service';
import { CadastroHomeCaresService } from 'src/app/services/cadastro-homecares.service';
import { Valid } from 'src/app/services/feat/Valid';
import { SharedLoadingService } from 'src/app/shared/services/shared-loading.service';
import { SharedValidService } from 'src/app/shared/services/shared-valid.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-informacoes-homecare',
  templateUrl: './informacoes-homecare.component.html',
  styleUrls: ['./informacoes-homecare.component.css']
})
export class InformacoesHomecareComponent implements OnInit {

  public valid: Valid;
  public isCadastro: boolean;
  public linkBotaoVoltar: string;
  public labelBotaoSubmit: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();
  public cnpj: string;

  constructor(
    private _validService: SharedValidService,
    private _loading: SharedLoadingService,
    private _service: HomecareService,
    private _router: Router,
    private _cadastro: CadastroHomeCaresService
  ) {
    this._loading.emitChange(true);
    this.valid = this._validService.getValid();
  }

  ngOnInit(): void {
    this._service.consultar(this.valid.id).subscribe(response => {
      this.cnpj = response.body.cnpj;
      if (response.body.id) {
        this._cadastro.homeCare = response.body;
      } else {
        this._cadastro.homeCare.cnpj = response.body.cnpj;
      }
    },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!');
        }
      }
    );
    this.isCadastro = false;
    this.linkBotaoVoltar = `homecares/${this.valid.id}/dados`;
    this.labelBotaoSubmit = 'Alterar';
  }

  onSubmit(homeCare: HomeCare) {
    this._loading.emitChange(true);
    homeCare.id = this.valid.id;
    homeCare.cnpj = this.cnpj;
    this._service.alterar(homeCare).subscribe(response => {
        setTimeout(() => {
          this._cadastro.homeCare = homeCare;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Alteração realizada com sucesso!',
            showConfirmButton: false,
            timer: 2000
          });
          this._router.navigateByUrl(`homecares/${this.valid.id}/dados`);
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
