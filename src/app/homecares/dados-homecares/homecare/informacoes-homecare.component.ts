import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeCare } from 'src/app/classes/homecare.class';
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

  public isAlteracao: boolean;
  public valid: Valid;
  public linkBotaoVoltar: string;
  public onSubmitEvent = new EventEmitter<FormGroup>();

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
    this._service.consultar(this.valid.id).subscribe(response =>
      this._cadastro.homeCare = response.body.data,
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404) {
          console.log('Não existem dados cadastrados!')
        }
      }
    );
    this.isAlteracao = true;
    this.linkBotaoVoltar = `homecares/${this.valid.id}`;
  }

  onSubmit(homeCare: HomeCare) {
    this._loading.emitChange(true);
    homeCare.id = this.valid.id;
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
        this._router.navigateByUrl(`homecares/${this.valid.id}/dados-homecares`);
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
